import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    backgroundColor: '#FF8C00',
    display: 'flex-direction',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#FFA500',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex',
      position: 'fixed',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <h1 style={{ color: '#FFF' }}>CSI ALIMENTAIRE</h1>
      </div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Chefs" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Menus" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Réserver une table" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Connexion" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="menu de navigation">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Button
        className={classes.button}
        onClick={handleDrawerToggle}
        variant="contained"
        color="secondary"
      >
        Menu
      </Button>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* contenu de votre page */}
      </main>
    </div>
  );
};

export default NavBar;
