import * as moment from 'moment';

export default {
  time(n, f = 'HH:mm:ss SSS') {
    return moment(n).format(f);
  },
};
