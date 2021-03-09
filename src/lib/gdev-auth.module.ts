import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from '../shared/firebase.module';
import { MaterialModule } from '../shared/material.module';
import { LoginButtonComponent, LoginButtonDialog } from './components/login-button/login-button.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';



@NgModule({
  declarations: [
    LoginButtonDialog,
    LoginButtonComponent,
    LoginCardComponent,
    RestorePasswordComponent
  ],
  imports: [
    MaterialModule,
    FirebaseModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    LoginButtonDialog,
    LoginButtonComponent,
    LoginCardComponent,
    RestorePasswordComponent
  ], schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GdevAuthModule { }
