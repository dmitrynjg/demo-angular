import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { HttpClientModule } from '@angular/common/http';
import { AppShellComponent } from './app-shell/app-shell.component';
import { ProductHistoryComponent } from './product-history/product-history.component';
import { AuthProvider } from './providers/auth/auth.component';
import { UserService } from './services/user.service';
import { RegisterAndLoginComponent } from './register-login/register-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { ProductFormComponent } from './product-form/product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    AppShellComponent,
    ProductHistoryComponent,
    AuthProvider,
    RegisterAndLoginComponent,
    ContentComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
