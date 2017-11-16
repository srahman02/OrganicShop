import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductEditComponent } from './components/admin/product-edit/product-edit.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { RouterModule} from '@angular/router'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule} from 'angular-4-data-table';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrderComponent } from './components/admin/admin-order/admin-order.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrderComponent,
    LoginComponent,
    SignupComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:ProductsComponent},
      {path:'login',component:LoginComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'signup',component:SignupComponent},

      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuardService]},
      {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuardService]},
      {path:'my/orders',component:MyOrderComponent,canActivate:[AuthGuardService]},
      
      
      {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuardService,AdminAuthGuard]},
      //{path:'edit-product/:id',component:ProductEditComponent,canActivate:[AuthGuardService,AdminAuthGuard]},
      {path:'admin/products/:id/edit',component:ProductEditComponent,canActivate:[AuthGuardService,AdminAuthGuard]},
      {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuardService,AdminAuthGuard]},
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuardService,AdminAuthGuard]},
      {path:'admin/orders',component:AdminOrderComponent,canActivate:[AuthGuardService, AdminAuthGuard]},
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
