import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import MarkdownDocsContents from 'libs/Markdown/MarkdownDocsContents';
import MarkdownElement from 'libs/Markdown/MarkdownElement';

import { withStyles, withTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    position: 'absolute',
    width: 'calc(100% - 284px)',
    height: 'calc(100% - 100px)',
    backgroundColor: theme.palette.background.paper,
  },
  rootimg: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    color: 'red',
  },
  gridList: {
    // width: 500,
    // height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  footer: {
    width: '100%',
    marginTop: theme.spacing(12),
  },
  pagination: {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
    height: 42,
  },
  markdownElement: {
    marginBottom: theme.spacing(2),
    padding: '0px 8px',
    paddingRight: 16,
  },
  markdownElementBlog: {
    maxWidth: 700,
    margin: 'auto',
    padding: 0,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: `Roboto Slab, ${theme.typography.fontFamily}`,
    fontWeight: 300,
    '& p, & ul, & ol': {
      lineHeight: 1.7,
    },
    '& strong': {
      fontWeight: 400,
      fontFamily: theme.typography.fontFamily,
    },
    '& img': {
      display: 'block',
      margin: 'auto',
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(14),
      textAlign: 'center',
    },
  },
});


function Markdown(props) {
  const classes = props.classes;
  const value = props.data;
  return (
    <Scrollbars>
      <MarkdownDocsContents markdown={value} markdownLocation={undefined}>
        {({ contents, markdownLocation }) => (
          <>
            <main className={classes.content}>
              <MarkdownElement
                text={value}
                className={clsx(classes.markdownElement, { [classes.markdownElementBlog]: false })}
              />

            </main>
          </>
        )}
      </MarkdownDocsContents>
    </Scrollbars>
  )
}


export default withStyles(styles)(withTheme(Markdown));