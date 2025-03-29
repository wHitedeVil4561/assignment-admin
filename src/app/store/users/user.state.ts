import { userList } from '../../data/user';
import { UserListI } from './user.model';

export const initUsers: UserListI = {
  data: [],
  count: 0,
  filter: {},
  usersPieChart: {
    admin: 0,
    viewer: 0,
    editor: 0,
  },
};
