import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),

    // Auth
    canActivate: [AuthGuard], // podrian hacer +, ej: role
    canMatch: [AuthGuard], // 2 times 'couse of child route
  },
  { path: '404', component: Error404PageComponent },

  // c/ tiene el path vacio, x eso debe ir full
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
