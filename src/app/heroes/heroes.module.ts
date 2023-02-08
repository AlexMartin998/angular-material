import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout/layout.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './componets/card/card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';

@NgModule({
  declarations: [
    HeroPageComponent,
    ListPageComponent,
    LayoutComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,

    // pipes
    HeroImagePipe,
  ],
  imports: [CommonModule, HeroesRoutingModule, MaterialModule],
})
export class HeroesModule {}
