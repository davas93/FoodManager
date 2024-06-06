import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {DiningInfoComponent} from "./components/dining-info/dining-info.component";
import {UserMenuTableComponent} from "./components/user-menu/components/user-menu-table/user-menu-table.component";
import {ToolbarComponent} from "../shared/components/toolbar/toolbar.component";
import {LoadingScreenComponent} from "../shared/components/loading-screen/loading-screen.component";
import {HomeRoutingModule} from "./home-routing.module";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeComponent,
    UserMenuComponent,
    AdminPanelComponent,
    DiningInfoComponent,
    UserMenuTableComponent,
    ToolbarComponent,
    LoadingScreenComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
