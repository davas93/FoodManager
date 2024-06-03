import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {DiningInfoComponent} from "./components/dining-info/dining-info.component";
import {authGuardFn} from "./auth/guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, pathMatch: 'full'},
  {path: 'user', component: UserMenuComponent, pathMatch: 'full', canActivate: [authGuardFn]},
  {path: 'admin', component: AdminPanelComponent, pathMatch: 'full', canActivate: [authGuardFn]},
  {path: 'dining', component: DiningInfoComponent, pathMatch: 'full', canActivate: [authGuardFn]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
