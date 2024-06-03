import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {catchError, of, Subject, switchMap} from "rxjs";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  standalone: true,
    imports: [
        ButtonDirective
    ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit{

  public logout$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {
  }

    ngOnInit(): void {
      this.logout$.pipe(
        switchMap(_ => this.authService.signOut().pipe(
          catchError(error => {
            console.error('Login error:', error);
            return of(null);
          }))),
        untilDestroyed(this)
      ).subscribe(_ => {
        this.router.navigate(['/auth']);
        console.log('logout')
      });
    }

}
