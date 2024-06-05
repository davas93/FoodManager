import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {AuthComponent} from "./auth/auth.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {DiningInfoComponent} from "./components/dining-info/dining-info.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import { UserMenuTableComponent } from './components/user-menu-table/user-menu-table.component';
import {IconFieldModule} from "primeng/iconfield";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserMenuComponent,
    AdminPanelComponent,
    DiningInfoComponent,
    UserMenuTableComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    TabViewModule,
    TableModule,
    IconFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
