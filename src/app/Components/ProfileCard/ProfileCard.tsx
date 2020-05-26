import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ProfileDialog } from "../ProfileDialog/ProfileDialog";
import { Profile } from "../../common/ProfileService/ProfileService.interface";
import { ProfileService } from "../../common/ProfileService/Profile.service";

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    actionButton: {
        justifyContent: 'center',
    }
});

export const ProfileCard = (props: any) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [profileCardData, setProfileCardData] = React.useState();

    const onCardClick = async (): Promise<void> => {
        const profileService = new ProfileService();
        const profileCardData = await profileService.getProfileById(props.profile.id);
        setProfileCardData(profileCardData);
        setOpen(true)
    };

    const onIsOpenChange = ():void => {
        setOpen(false)
    };

    const onSubmitClick = async (editedFormToSubmit: Profile): Promise<void> => {
        if(JSON.stringify(profileCardData) !== JSON.stringify(editedFormToSubmit)) {
            const profileService = new ProfileService();
            await profileService.updateProfileById(editedFormToSubmit);
            props.onSubmit();
        }
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.profile.name}
                </Typography>
            </CardContent>
            <CardActions className={classes.actionButton}>
                <Button onClick={onCardClick} size="small">Edit</Button>
            </CardActions>
            {
                open && <ProfileDialog
                    profile={profileCardData}
                    onIsOpenChange={onIsOpenChange}
                    onSubmitClick={onSubmitClick}
                    buttonText='Save Changes'
                    title={`Edit ${props.profile.name}`}
                    isOpen={true}/>
            }
        </Card>
    );
};
