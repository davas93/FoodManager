import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {MultiSelectModule} from "primeng/multiselect";
import {InputIconModule} from "primeng/inputicon";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TagModule} from "primeng/tag";
import {InputMaskModule} from "primeng/inputmask";
import {InputGroupModule} from "primeng/inputgroup";
import {BlockUIModule} from "primeng/blockui";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    TabViewModule,
    TableModule,
    IconFieldModule,
    ToastModule,
    ProgressSpinnerModule,
    DialogModule,
    MultiSelectModule,
    InputIconModule,
    ConfirmDialogModule,
    TagModule,
    InputMaskModule,
    InputGroupModule,
    BlockUIModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    TabViewModule,
    TableModule,
    IconFieldModule,
    ToastModule,
    ProgressSpinnerModule,
    DialogModule,
    MultiSelectModule,
    InputIconModule,
    ConfirmDialogModule,
    TagModule,
    InputMaskModule,
    InputGroupModule,
    BlockUIModule
  ]
})
export class SharedModule { }
