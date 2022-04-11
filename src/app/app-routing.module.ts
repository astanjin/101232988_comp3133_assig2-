import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },

      {
        path: '',
        component: LoginComponent,
      },
        {
        path: 'admin',
        component: AdminComponent,
      },
        {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'booking',
        component: BookingComponent,
      },

    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
