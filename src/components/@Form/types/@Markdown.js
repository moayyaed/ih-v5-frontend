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

const test = "# Установка системы\n\n## Linux и macOS\n\n### Установка\n\nСистему IntraSCADA можно установить на любой компьютер с операционными системами Linux (x64, arm64, armv7l) и macOS (x64)\n\nДля установки системы наберите в терминале команду:\n\n```bash\ncurl -sL https://git.io/JYAeq | sudo -E bash\n```\n\nВ комплекте устанавливаются:\n\n- База данных SQLite\n- Плагин Emulator\n\n\n### Удаление\n\nСистема IntraSCADA размещается в двух папках:\n\nВ папке /opt/ih-v5 находится сама система\nВ папке /var/lib/ih-v5 находятся проекты и плагины\n\nДля удаления системы IntraSCADA выполнить команду:\n\n```bash\nsudo systemctl disable ih-v5\n```\n\nИ удалить папки:\n\n```bash\nsudo rm -R /opt/ih-v5\nsudo rm -R /var/lib/ih-v5\n```\n---\n\n## Windows\n\n### Установка\n\nСистему IntraSCADA можно установить на любой компьютер с операционными системами Windows 10 x64\n\nДля установки системы  IntraSCADA откройте Командную строку под Администратором и наберите команду:\n\n```bash\npowershell -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command \"$l=\'ru\';iex ((New-Object System.Net.WebClient).DownloadString(\'https://git.io/JYpbW\'))\"\n```\n> Установка IntraSCADA на операционную систему Windows 10 рекомендуется только для тестирования или для разработки проектов.  \n> Для систем, работающих в режиме 24/7 рекомендуется операционная система Linux"

function Markdown(props) {
  const classes = props.classes;
  const value = test || props.data;
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