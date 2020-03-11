
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#8fa4ae',
  },
})(Tabs);


export default AntTabs;