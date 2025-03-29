import { Routes } from '@angular/router';
import { APP_ROUTES } from './config/route.constant';

export const routes: Routes = [
  {
    path: APP_ROUTES.DASHBOARD,
    loadComponent: () =>
      import('./components/user-dashboard/user-dashboard.component').then(
        (c) => c.UserDashboardComponent
      ),
      data:{
        isSignalApproach:false
      }
  },
  {
    path: APP_ROUTES.DASHBOARD_SIGNAL,
    loadComponent: () =>
      import('./components/user-dashboard/user-dashboard.component').then(
        (c) => c.UserDashboardComponent
      ),
      data:{
        isSignalApproach:true
      }
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
];