import React, {useEffect} from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { useStyles } from "./HomeStyle";
import { AccountCircle } from "@material-ui/icons";
import { Menu } from "@material-ui/core";
import logo from "../../../assets/simpo.png";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import './Home.scss';
import { ProfileDialog } from "../ProfileDialog/ProfileDialog";
import { ProfileService } from "../../common/ProfileService/Profile.service";
import {ProfileList} from "../ProfileTypography/ProfileList";
import { Profile } from "../../common/ProfileService/ProfileService.interface";

type Anchor = "left";

export const Home = () => {
    const classes = useStyles();
    const [profiles, setProfiles] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [profilesService, setProfilesService] = React.useState<ProfileService>();
    const [profileDialogOpen, setProfileDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    useEffect(() => {
        (async () => {
            const profilesService = new ProfileService();
            setProfilesService(profilesService);
            const tempProfiles = await profilesService.getAllProfiles();
            setProfiles(tempProfiles);
        })();
    },[]);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const onCreatProfileClick = (): void => {
        setProfileDialog(true)
    };

    const onSubmitClick = async (profileToCreate: Profile): Promise<void> => {
        const newProfile = {
            ...profileToCreate,
            id: `${profiles.length + 1}`
        };
        try {
            await profilesService?.createProfile(newProfile);
            const tempProfiles = await profilesService?.getAllProfiles();
            setProfiles(tempProfiles);
        }catch (e) {
            console.log("Error");
        }
    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, [classes.fullList])}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <Divider />
            <List>
                <ListItem button key='Dashboard'>
                    <ListItemIcon>
                        <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText onClick={onCreatProfileClick} primary='Create a Profile' />
                </ListItem>
            </List>
        </div>
    );

    const menuId = "primary-search-account-menu";
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    const onIsOpenChange = (): void => {
        setProfileDialog(false);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}>
        </Menu>
    );


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar)}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer("left", true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <div className={classes.headerTitleContainer}>
                            <img className={classes.logo} alt='user-img' src={logo}/>
                            <span className={classes.headerTitle}> Simpo </span>
                        </div>
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}>
                <div className={classes.drawerHeader} />
                {
                    // @ts-ignore
                    profiles && <ProfileList profiles={profiles}/>
                }
                <div>
                    {(["left"] as Anchor[]).map(anchor => (
                        <React.Fragment key={anchor}>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                onOpen={toggleDrawer(anchor, true)}>
                                {list(anchor)}
                            </SwipeableDrawer>
                        </React.Fragment>
                    ))}
                </div>
            </main>
            {renderMenu}
            {
                profileDialogOpen &&
                <ProfileDialog
                    title='Create Profile'
                    isOpen={profileDialogOpen}
                    buttonText='Create'
                    onIsOpenChange={onIsOpenChange}
                    onSubmitClick={onSubmitClick}/>
            }
        </div>
    );
};
