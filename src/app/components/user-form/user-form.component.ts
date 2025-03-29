import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RoleI, roleList } from '../../data/role';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserI } from '../../store/users/user.model';
import { UserStore } from '../../store/users/user.store';

@Component({
  selector: 'app-user-form',
  imports: [MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public matdialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.createForm();
  }
  userForm!: FormGroup;
  roleList: RoleI[] = roleList;
  userStore = inject(UserStore);
  createForm() {
    this.userForm = this.fb.group({
      name: [],
      email: [],
      role: [],
    });
  }
  onSubmit() {
    if (this.userForm.invalid) return;
    if (this.dialogData?.isSignalApproach) {
      this.userStore.addUser(this.userForm.value).subscribe({
        next: (res) => {
          this.matdialogRef.close({ userAdded: false });
          this.userStore.getUsers().subscribe();
          this.userStore.getUsersByRoles().subscribe();
        },
      });
      return;
    }
    this.userService.createUser(this.userForm.value).subscribe({
      next: (res: UserI) => {
        this.matdialogRef.close({ userAdded: true });
      },
    });
  }
}
