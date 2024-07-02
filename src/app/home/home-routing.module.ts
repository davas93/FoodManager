import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {DiningInfoComponent} from "./components/dining-info/dining-info.component";
import {authGuardDeactivate} from "../auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'user',
        component: UserMenuComponent,
        canDeactivate: [authGuardDeactivate]
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canDeactivate: [authGuardDeactivate]
      },
      {
        path: 'dining',
        component: DiningInfoComponent,
        canDeactivate: [authGuardDeactivate]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
