import { count, Observable, of } from 'rxjs';
import { AccessRoleT, UserI } from '../store/users/user.model';
export interface UserListFilterI {
  page?: number;
  page_size?: number;
  search?: string;
  role?: string[];
}
export interface UserByCategoryI {
  admin: number;
  editor: number;
  viewer: number;
}
export interface UserListResI {
  data: UserI[];
  count: number;
}
export interface AddUserPayloadI {
  name: string;
  email: string;
  role: AccessRoleT;
}
export function getLimitOffset(
  page = 1,
  page_size = 5
): { limit: number; offset: number } {
  const offset = (page - 1) * page_size;
  const limit = page * page_size;
  return { limit, offset };
}
export const userList: UserI[] = [
  {
    id: 'user 1',
    name: 'Dummy Name 1',
    email: 'dummy1@gmail.com',
    role: 'admin',
    status: 1,
  },
  {
    id: 'user 2',
    name: 'Dummy Name 2',
    email: 'dummy2@gmail.com',
    role: 'editor',
    status: 1,
  },
  {
    id: 'user 3',
    name: 'Dummy Name 3',
    email: 'dummy3@gmail.com',
    role: 'viewer',
    status: 0,
  },
  {
    id: 'user 4',
    name: 'Dummy Name 4',
    email: 'dummy4@gmail.com',
    role: 'admin',
    status: -1,
  },
  {
    id: 'user 5',
    name: 'Dummy Name 5',
    email: 'dummy5@gmail.com',
    role: 'admin',
    status: 1,
  },
  {
    id: 'user 6',
    name: 'Dummy Name 6',
    email: 'dummy6@gmail.com',
    role: 'editor',
    status: 1,
  },
  {
    id: 'user 7',
    name: 'Dummy Name 7',
    email: 'dummy7@gmail.com',
    role: 'viewer',
    status: 0,
  },
  {
    id: 'user 8',
    name: 'Dummy Name 8',
    email: 'dummy8@gmail.com',
    role: 'admin',
    status: -1,
  },
  {
    id: 'user 9',
    name: 'Dummy Name 9',
    email: 'dummy9@gmail.com',
    role: 'admin',
    status: 1,
  },
  {
    id: 'user 10',
    name: 'Dummy Name 10',
    email: 'dummy10@gmail.com',
    role: 'editor',
    status: 1,
  },
  {
    id: 'user 11',
    name: 'Dummy Name 11',
    email: 'dummy11@gmail.com',
    role: 'viewer',
    status: 0,
  },
  {
    id: 'user 12',
    name: 'Dummy Name 12',
    email: 'dummy12@gmail.com',
    role: 'admin',
    status: -1,
  },
];

export function getUsersList(
  payload?: UserListFilterI
): Observable<UserListResI> {
  const { page, page_size, search, role } = payload ?? {};
  const { limit, offset } = getLimitOffset(page, page_size);
  let filterList = userList;
  if (search) {
    filterList = userList.filter(
      (item) =>
        item.email?.includes(search) ||
        item.id?.includes(search) ||
        item.name?.includes(search)
    );
  }
  if (role && role.length) {
    filterList = filterList.filter((item) => role.includes(item.role));
  }
  return of({
    data: filterList.slice(offset, limit),
    count: filterList.length,
  });
}

export function getUsersByRole(): Observable<UserByCategoryI> {
  const usersCount = userList.reduce(
    (acc, curr) => {
      if (curr.role === 'admin') acc.admin++;
      if (curr.role === 'editor') acc.editor++;
      if (curr.role === 'viewer') acc.viewer++;
      return acc;
    },
    { admin: 0, editor: 0, viewer: 0 }
  );
  return of(usersCount);
}

export function addUser(payload: AddUserPayloadI):Observable<any> {
  const unique_id = `user ${userList.length + 1}`;
  const body: UserI = {
    ...payload,
    id: unique_id,
    status: 1,
  };
  userList.unshift(body);
  console.log(userList);
  return of(body)
}
