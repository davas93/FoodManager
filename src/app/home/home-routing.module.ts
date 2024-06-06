import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {DiningInfoComponent} from "./components/dining-info/dining-info.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'user',
        component: UserMenuComponent,
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
      },
      {
        path: 'dining',
        component: DiningInfoComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
