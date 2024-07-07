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
import { PersonalMenuComponent } from './components/admin-panel/components/personal-menu/personal-menu.component';
import { MenuAdministrationComponent } from './components/admin-panel/components/menu-administration/menu-administration.component';
import { UsersManagementComponent } from './components/admin-panel/components/users-management/users-management.component';
import {FullCalendarModule} from "@fullcalendar/angular";



@NgModule({
  declarations: [
    HomeComponent,
    UserMenuComponent,
    AdminPanelComponent,
    DiningInfoComponent,
    UserMenuTableComponent,
    ToolbarComponent,
    LoadingScreenComponent,
    PersonalMenuComponent,
    MenuAdministrationComponent,
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class HomeModule { }
