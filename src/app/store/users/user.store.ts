import {
  getState,
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initUsers } from './user.state';
import { effect, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  AddUserPayloadI,
  UserListFilterI,
  UserListResI,
} from '../../data/user';
import { exhaustMap, Observable, tap } from 'rxjs';
import { UserI } from './user.model';
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initUsers),
  withMethods((store, userService = inject(UserService)) => ({
    getUsers(payload?: UserListFilterI): Observable<UserListResI> {
      patchState(store, (state) => ({
        filter: { ...state.filter, ...payload },
      }));
      const params = store.filter();
      return userService.fetchUserList(params).pipe(
        tap((res) => {
          const { data, count } = res;
          patchState(store, {
            data,
            count,
          });
        })
      );
    },
    getUsersByRoles() {
      return userService.fetchUsersByRole().pipe(
        tap((res) => {
          patchState(store, { usersPieChart: res });
        })
      );
    },
    addUser(payload: AddUserPayloadI):Observable<UserI> {
      return userService.createUser(payload)
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log(state, 'state is chaning');
      });
    },
  })
);
