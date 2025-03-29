import { TitleCasePipe } from '@angular/common';
import {
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, Subscription } from 'rxjs';
import { RoleI, roleList } from '../../data/role';
import { UserListFilterI, UserListResI } from '../../data/user';
import { UserService } from '../../services/user.service';
import { UserI } from '../../store/users/user.model';
import { UserStore } from '../../store/users/user.store';

@Component({
  selector: 'app-user-table',
  imports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    TitleCasePipe,
    MatPaginatorModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, public userService: UserService) {
    this.createForm();
  }
  isSignalApproach: InputSignal<boolean> = input(false);
  userStore = inject(UserStore);
  filterForm!: FormGroup;
  roleList: RoleI[] = roleList;
  userList: UserI[] = [];
  total = 0;
  pageIndex = 0;
  userAdded$!: Subscription;
  ngOnInit(): void {
    this.onFormValueChanges();
    if (this.isSignalApproach()) {
      this.userStore.getUsers({page:1,search:'',role:[]}).subscribe();
      return;
    }
    this.retrieveUserList();
    this.getUserAddedSubscription();
  }
  createForm() {
    this.filterForm = this.fb.group({
      search: [],
      role: [[]],
    });
  }
  onFormValueChanges() {
    this.filterForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe({
        next: (res) => {
          const { role } = this.filterForm.value;
          this.pageIndex = 0;
          if(this.isSignalApproach()){
            this.userStore.getUsers({ search: res, role, page: 1 }).subscribe()
            return
          }
          this.retrieveUserList({ search: res, role, page: 1 });
        },
      });
    this.filterForm.get('role')?.valueChanges.subscribe({
      next: (res) => {
        const { search } = this.filterForm.value;
        this.pageIndex = 0;
        if(this.isSignalApproach()){
          this.userStore.getUsers({ role: res, search, page: 1 }).subscribe()
          return
        }
        this.retrieveUserList({ role: res, search, page: 1 });
      },
    });
  }
  retrieveUserList(payload?: UserListFilterI) {
    this.userService.fetchUserList(payload).subscribe({
      next: (res: UserListResI) => {
        const { data, count } = res;
        this.userList = data;
        this.total = count;
      },
    });
  }
  onPageChange(pageEvent: any) {
    const { search, role } = this.filterForm.value;
    const { pageIndex } = pageEvent;
    if(this.isSignalApproach()){
      this.userStore.getUsers({ search, role, page: (pageIndex ?? 0) + 1 }).subscribe()
      return
    }
    this.pageIndex = pageIndex;
    this.retrieveUserList({ search, role, page: (pageIndex ?? 0) + 1 });
  }
  getUserAddedSubscription() {
    this.userAdded$ = this.userService.userAdded$.subscribe({
      next: (res) => {
        if (res) {
          const { search, role } = this.filterForm.value;
          this.retrieveUserList({ page: this.pageIndex + 1, search, role });
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.userAdded$?.unsubscribe();
  }
}
