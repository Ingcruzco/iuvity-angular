import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HamburguerComponent } from './components/hamburguer/hamburguer.component';
import { TableComponent } from './components/table/table.component';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ConfirmationFormComponent } from './components/confirmation-form/confirmation-form.component';
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastErrorComponent } from './components/toast-error/toast-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HamburguerComponent,
    TableComponent,
    UsersContainerComponent,
    UserFormComponent,
    FormModalComponent,
    ConfirmationFormComponent,
    SwitchLangComponent,
    SpinnerComponent,
    PaginationComponent,
    ToastComponent,
    ToastErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}