import { Injectable } from '@angular/core';
import { UserI } from '../store/users/user.model';
import {
  addUser,
  AddUserPayloadI,
  getUsersByRole,
  getUsersList,
  UserListResI,
  UserListFilterI,
} from '../data/user';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UserService {
  userAdded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  createUser(payload: AddUserPayloadI):Observable<UserI> {
    return addUser(payload);
  }

  fetchUserList(payload?: UserListFilterI): Observable<UserListResI> {
    return getUsersList(payload);
  }

  fetchUsersByRole() {
    return getUsersByRole();
  }
}
