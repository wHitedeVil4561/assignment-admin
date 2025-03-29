import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { UserByCategoryI } from '../../data/user';
import { UserStore } from '../../store/users/user.store';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public userService: UserService) {
    this.retrieveUsersByRoleThroughSignal()
  }
  userPieChart!: Chart;
  isSignalApproach: InputSignal<boolean> = input(false);
  @ViewChild('usersByRole') usersChartRef!: ElementRef;
  userAdded$!: Subscription;
  userStore = inject(UserStore);
  ngOnInit(): void {
    if(this.isSignalApproach()){
      this.userStore.getUsersByRoles().subscribe()
    }
    this.userAdded$ = this.userService.userAdded$.subscribe({
      next: (res) => {
        if (res) {
          this.retrieveUsersByRole();
        }
      },
    });
  }
  ngAfterViewInit(): void {
    if(!this.isSignalApproach()){
      this.retrieveUsersByRole();
    }
  }
  initialisePieChart(data: number[]) {
    this.userPieChart?.destroy();
    this.userPieChart = new Chart(this.usersChartRef.nativeElement, {
      type: 'pie',
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            label: 'Total',
            data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
            borderRadius: 12,
          },
        ],
      },
    });
    
  }
  retrieveUsersByRole() {
    this.userService.fetchUsersByRole().subscribe({
      next: (res: UserByCategoryI) => {
        const { admin, editor, viewer } = res;
        this.initialisePieChart([admin, editor, viewer]);
      },
    });
  }
  ngOnDestroy(): void {
    this.userAdded$?.unsubscribe();
  }
  retrieveUsersByRoleThroughSignal(){
    effect(()=>{  
      if(this.isSignalApproach()){
        const {admin,editor,viewer} = this.userStore.usersPieChart();
        setTimeout(()=>{
          this.initialisePieChart([admin,editor,viewer])
        })
      }
    })
  }
}
