import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

// localhost:4200/herores
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      { path: 'new-hero', component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:id', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },

      { path: ':id', component: HeroPageComponent }, // by/:id
      { path: '**', redirectTo: 'list' }, //   / -> /list
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
