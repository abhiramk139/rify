import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { UrlConstant } from './url-constant';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogComponent } from './admin-dashboard/mat-dialog/mat-dialog.component';
import { DeleteDialogComponent } from './admin-dashboard/delete-dialog/delete-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordComponent } from './admin-dashboard/change-password/change-password.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';




@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignUpFormComponent,
    AdminDashboardComponent,
    MatDialogComponent,
    DeleteDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  providers: [UsersService, UrlConstant],
  bootstrap: [AppComponent]
})
export class AppModule { }
