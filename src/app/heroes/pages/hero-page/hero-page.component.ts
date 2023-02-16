import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero; // en el init es undefined, hasta q se haga la peticion y traiga el hero

  constructor(
    private readonly heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, // obtener el param de la URL
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id))) //smap modifica data
      .subscribe((hero) => {
        // si no viene 1 hero, lo saco de la ruta
        if (!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }
}
