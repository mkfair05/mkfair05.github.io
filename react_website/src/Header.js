import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, makeStyles, CssBaseline, useScrollTrigger, Fab, Zoom
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';

// const useStyles = makeStyles(theme => ({
//   root: {
//     position: 'fixed',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
//   header: {
//     backgroundColor: '#3c3c3c'
//   },
//   headerIcons: {
//     display: 'none',
//     position: 'relative',
//     justifyContent: 'right',
//     [theme.breakpoints.up('sm')]: {
//       display: 'flex',
//     },
//   },
// }));

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '100px',
    right: '100px',
  },
  header: {
    backgroundColor: '#3c3c3c'
  },
  headerItems: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerIcons: {
    display: 'inline-flex',
    justifyContent: 'space-evenly',
  },
});

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const headerRef = React.createRef()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      headerRef.current.focus();
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root} ref={headerRef}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.header} position='static'>
        <Toolbar className={classes.headerItems}>
          <Typography variant="h6">Meghan Fair</Typography>
          <div className={classes.headerIcons}>
            <IconButton
              aria-label="LinkedIn"
              edge="none"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="Github"
              edge="none"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="Attachment"
              edge="none"
              color="inherit"
            >
              <AttachmentIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}