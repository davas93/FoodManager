import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {catchError, Observable, of, Subject, switchMap} from "rxjs";
import {untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FoodManager';

  public isAuthenticated$: Observable<boolean>;
  public logout$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {

    this.isAuthenticated$ = this.authService.isAuthenticated;

  }

  ngOnInit(): void {
    this.logout$.pipe(
      switchMap(_ => this.authService.signOut().pipe(
        catchError(error => {
          console.error('Login error:', error);
          return of(null);
        })))
    ).subscribe(_ => {
      this.router.navigate(['/auth']);
      console.log('logout')
    });
  }

  ngOnDestroy(): void {
    this.logout$.next()
  }
}
