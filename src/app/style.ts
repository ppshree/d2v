import { makeStyles } from '@material-ui/core/styles';

export const useStylesCommon = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto',
    height: 'calc(100% - 64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  drawerFooterContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  btnErrorText: {
    color: theme.palette.error.main,
    background: 'transparent',
    border: 'none',
    marginBottom: 16,
    fontSize: 16,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.error.light,
    },
  },
  btnText: {
    color: theme.palette.text.primary,
    background: 'transparent',
    border: 'none',
    marginBottom: 16,
    fontSize: 16,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#E2E7ED',
    height: 'calc(100% - 112px)',
    marginTop: 64,
  },

  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 472,
    height: 486,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
  },
  popUpPaper: {
    position: 'absolute',
    width: 472,
    padding: 15,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
  },
  chatPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chatRoot: {
    flexGrow: 1,
  },
  closeBtn: {
    position: 'relative',
    top: '5px',
    cursor: 'pointer',
  },
  typography: {
    padding: theme.spacing(2),
  },
  logoIcon: {
    width: 20,
    height: 20,
  },
}));
