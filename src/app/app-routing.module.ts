import { inject, NgModule } from '@angular/core';
import { Route, Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPermissionsService } from './utils/user-permissions.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component')
        .then(c => c.AdminDashboardComponent),
    canMatch: [(route: Route, segments: UrlSegment[]) => {
      const router = inject(Router);
      return inject(UserPermissionsService).isAdmin$.pipe(
        map(isAdmin => isAdmin || router.createUrlTree(['']))
      );
    }]
  },

  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
