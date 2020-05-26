import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isEmpty, map, every, get } from "lodash";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ProfileForm, ValidationFormObject } from "./ProfileDialog.interface";
import { AccountCircle } from "@material-ui/icons";
import './ProfileDialog.css';
import {Profile} from "../../common/ProfileService/ProfileService.interface";

const IS_NAME_VALID = 'isNameValid';
const IS_BIO_VALID = 'isBioValid';
const IS_LINK_VALID = 'isLinkValid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
            fontSize: '12px',
            justifyContent: 'center',
            display: 'flex'
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        userImg: {
            width: '1.5em',
            height: '1.5em',
            display: 'inline-block',
            fontSize: '1.5rem',
            borderRadius: '26px',
            marginLeft: '20px'
        },
        titleContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        title: {
            paddingLeft: '15px'
        }
    }),
);

export const ProfileDialog = React.memo((props: any) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.isOpen);
    const [profileName, setProfileName] = React.useState<string>(get(props, 'profile.name',''));
    const [profileBio, setProfileBio] = React.useState<string>(get(props, 'profile.bio',''));
    const [profileFbLink, setProfileFbLink] = React.useState<string>(get(props, 'profile.fb_id',''));

    const [profileNameError, setProfileNameError] = React.useState<boolean>(false);
    const [profileLinkError, setProfileLinkError] = React.useState<boolean>(false);
    const [profileBioError, setProfileBioError] = React.useState<boolean>(false);

    const [nameHelperText, setNameHelperText] = React.useState<string>('');
    const [bioHelperText, setBioHelperText] = React.useState<string>('');
    const [linkHelperText, setLinkHelperText] = React.useState<string>('');


    const OnSetProfileName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(isEmpty(event.target.value), IS_NAME_VALID, 'its a require field');
        setProfileName(event.target.value);
    };


    const OnSetProfileBio = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setError(isEmpty(event.target.value), IS_BIO_VALID, 'its a require field');
        setProfileBio(event.target.value);
    };

    const OnSetProfileFbLink = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setError(isEmpty(event.target.value), IS_LINK_VALID, 'its a require field');
        setProfileFbLink(event.target.value);
    };

    const handleClose = (): void => {

        setProfileName('');
        setProfileBio('');
        setProfileFbLink('');


        setNameHelperText('');
        setBioHelperText('');
        setLinkHelperText('');
        setOpen(false);

        props.onIsOpenChange(false)
    };

    const setError = (flagToSet: boolean, key: string, msg: string): void => {
        switch(key) {
            case IS_NAME_VALID:
                setProfileNameError(flagToSet);
                flagToSet
                    ? setNameHelperText(msg)
                    :  setNameHelperText('');
                break;
            case IS_BIO_VALID:
                setProfileBioError(flagToSet);
                flagToSet
                    ? setBioHelperText(msg)
                    :  setBioHelperText('');
                break;
            case IS_LINK_VALID:
                setProfileLinkError(flagToSet);
                flagToSet
                    ? setLinkHelperText(msg)
                    :  setLinkHelperText('');
                break;
        }
    };

    const checkFormValidation = (formToValidate: ProfileForm): ValidationFormObject => {
        const validationFormObject: ValidationFormObject = {
            profileName: false,
            profileBio: false,
            profileFbLink: false
        };
        map(formToValidate , (val,key) => {
            switch (key) {
                case 'profileName':
                    if(isEmpty(val)) {
                        setError(true, IS_NAME_VALID, `Please fill name`);
                        validationFormObject[key] = false;
                    } else {
                        validationFormObject[key] = true;
                    }
                    break;
                case 'profileBio':
                    if(isEmpty(val)) {
                        setError(true, IS_BIO_VALID, `Please fill Bio`);
                        validationFormObject[key] = false;
                    } else {
                        validationFormObject[key] = true;
                    }
                    break;
                case 'profileFbLink':
                    if(isEmpty(val)) {
                        setError(true, IS_LINK_VALID, `Please fill Link`);
                        validationFormObject[key] = false;
                    } else {
                        validationFormObject[key] = true;
                    }
                    break;
            }
        });
        return validationFormObject;
    };

    const submitHandler = async (): Promise<void> => {
        const formValid: ValidationFormObject = checkFormValidation({
            profileName,
            profileBio,
            profileFbLink
        });
        if (every(formValid, ob => ob)) {
            props.onSubmitClick({
                id: get(props, 'profile.id'),
                name: profileName,
                bio: profileBio,
                fb_id: profileFbLink,
            });
            handleClose();
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <div className={classes.titleContainer}>
                    {
                        get(props, 'profile.fb_id')
                            ? <img alt='user-img' className={classes.userImg} src={`http://graph.facebook.com/${props.profile.fb_id}/picture`}/>
                            : <AccountCircle className={classes.userImg}/>
                    }
                    <DialogTitle  className={classes.title} id="form-dialog-title">{props.title}</DialogTitle>
                </div>
                <DialogContent>
                    <DialogContentText>
                        Please fill the form below to create a profile
                    </DialogContentText>
                    <div className='container'>
                        <TextField
                            error={profileNameError}
                            helperText={nameHelperText}
                            id="profileName"
                            label="name"
                            type="text"
                            value={profileName}
                            variant="outlined"
                            required
                            size='small'
                            fullWidth
                            onChange={OnSetProfileName}/>
                    </div>
                    <div className='container'>
                        <TextField
                            error={profileBioError}
                            helperText={bioHelperText}
                            id="profileBio"
                            label="bio"
                            type="text"
                            value={profileBio}
                            variant="outlined"
                            required
                            size='small'
                            fullWidth
                            onChange={OnSetProfileBio}/>
                    </div>
                    <div className='container'>
                        <TextField
                            error={profileLinkError}
                            helperText={linkHelperText}
                            id="profileFbLink"
                            label="Facebook image link"
                            type="text"
                            value={profileFbLink}
                            variant="outlined"
                            required
                            size='small'
                            fullWidth
                            onChange={OnSetProfileFbLink}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitHandler} color="primary">
                        {props.buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});
