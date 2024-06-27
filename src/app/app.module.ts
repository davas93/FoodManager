import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthComponent} from "./auth/auth.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
