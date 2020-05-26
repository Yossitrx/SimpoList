import {createStyles, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: {
            light: 'red',
            main: 'red',
            dark: 'red',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
        },
        appBar: {
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        hide: {
            display: "none"
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerHeader: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: "flex-end"
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: -drawerWidth
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        },
        list: {
            width: 250
        },
        fullList: {
            width: "top"
        },
        grow: {
            flexGrow: 1
        },
        userImg: {
            width: '1em',
            height: '1em',
            display: 'inline-block',
            fontSize: '1.5rem',
            borderRadius: '12px'
        },
        headerTitleContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        headerTitle: {
            fontFamily: 'Dancing Script, cursive',
            fontSize: '25px'
        },
        logo: {
            width: '40px',
            height: '30px',
            paddingRight: '10px'
        },
    })
);
