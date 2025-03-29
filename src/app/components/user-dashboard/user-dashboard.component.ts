import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { UserTableComponent } from '../user-table/user-table.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  imports: [PieChartComponent, UserTableComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit{
  constructor(private dialog: MatDialog, public userService: UserService,private activatedRoute:ActivatedRoute) {}
  isSignalApproach = false;
  ngOnInit(): void {
    this.getRouteData()
  }
  onAddUser() {
    import('../user-form/user-form.component').then((c) => {
      const dialogRef = this.dialog.open(c.UserFormComponent, {
        data: {
          edit: false,
          isSignalApproach:this.isSignalApproach
        },
        width: '476px',
        restoreFocus:true
      });
      dialogRef.afterClosed().subscribe({
        next: (res) => {
          const { userAdded } = res ?? {};
          if (userAdded) {
            this.userService.userAdded$.next(userAdded)
          }
        },
      });
    });
  }
  getRouteData(){
   const {isSignalApproach} = this.activatedRoute.snapshot.data ?? {};
    this.isSignalApproach = isSignalApproach ?? false
  }
}
