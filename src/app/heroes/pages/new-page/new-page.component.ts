import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  // formulario reactivo
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel Comics' },
  ];

  constructor(
    private readonly heroesService: HeroesService,

    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router
  ) {}

  get currectHero(): Hero {
    const hero = this.heroForm.value;

    return hero as Hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRouter.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');

        // setear el hero en el form -- mismos names del obj con el del html
        return this.heroForm.reset(hero);
      });
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    // update
    if (this.currectHero.id)
      return this.heroesService
        .updateHero(this.currectHero)
        .subscribe((hero) => {
          // mostrar snackbar
          console.log(hero);
        });

    // create
    return this.heroesService.addHero(this.currectHero).subscribe((hero) => {
      console.log(hero);
    });
  }
}
