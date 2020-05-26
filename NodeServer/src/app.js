const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require("lodash");

const app = express();
const port = 8088;
const mLabDb = 'mongodb://yossi:Simpo#30@ds145486.mlab.com:45486/fd_simpo';
const DOCUMENT_ID = '5eca323ce7179a6b6363c49b';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(mLabDb, {useNewUrlParser: true})
  .then( () => console.log('The Mongoose connection is ready'))
  .catch(error => console.log('Some problem with the connection ' + error));

const Schema = mongoose.Schema;

const profilesSchema = new Schema({
    profiles: [{
        id: {
            type: String,
            unique: true,
            required: true
        },
        name: String,
        bio: String,
        fb_id: String
    }]
});

const ProfilesList = mongoose.model('profiles', profilesSchema);


app.post( "/profile", ( req, res ) => {
    ProfilesList.updateOne(
      { _id: DOCUMENT_ID },
      { $push: { profiles: req.body } },
      { safe: true, multi:true }, (err, obj) => {
          if(err){
              res.status(404).send('Not found');
          } else {
              res.json(obj);
          }
    });
});

app.get( "/profiles", ( req, res ) => {
    ProfilesList.find({}, (error) => {
        if(error) {
            console.log("error getting data", error);
            res.status(404).send('Not found');
        }
    }).then((data) => {
        console.log("data", data[0]);
        res.json(_.map(data[0].profiles, (profile) => {
           return {id: profile.id, name: profile.name}
        }));
    });
});

app.get( "/profile", ( req, res ) => {
    ProfilesList.find({}, (error) => {
        if(error) {
            console.log("error getting data", error);
            res.status(404).send('Not found');
        }
    }).then((data) => {
        const {id, name, bio, fb_id } = _.filter(data[0].profiles, { 'id':  req.query.id })[0];
        res.json({id, name, bio, fb_id })
    });
});

app.put( "/profile", ( req, res ) => {
    ProfilesList.findOneAndUpdate(
        { "_id": DOCUMENT_ID, "profiles.id": req.body.id },
        {
            "$set": {
                "profiles.$": req.body
            }
        },
        (err,profilesList) => {
            console.log("err", err);
            if(err){
                res.status(404).send('Not found');
            } else {
                res.json(_.map(profilesList.profiles, (profile) => {
                    return {id: profile.id, name: profile.name}
                }));
            }
        }
    );
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
