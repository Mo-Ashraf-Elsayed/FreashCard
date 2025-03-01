import { Routes } from '@angular/router';
import { VisitorLayoutComponent } from './core/layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { CategoryListComponent } from './features/category/components/category-list/category-list.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { BrandsListComponent } from './features/brands/components/brands-list/brands-list.component';
import { ProductDetailsComponent } from './features/product/components/product-details/product-details.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { isLoginGuard } from './core/guards/is-login.guard';
import { CartListComponent } from './features/cart/components/cart-list/cart-list.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ForgotPasswordComponent } from './core/auth/components/forgot-password/forgot-password.component';
import { VerifyResetCodeComponent } from './core/auth/components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './core/auth/components/reset-password/reset-password.component';
import { CheckOutComponent } from './features/order/components/check-out/check-out.component';
import { WishListComponent } from './features/wishList/components/wish-list/wish-list.component';
import { UserOrdersComponent } from './features/order/components/user-orders/user-orders.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isLoginGuard],
    component: VisitorLayoutComponent,
    children: [
      { path: '', redirectTo: 'signIn', pathMatch: 'full' },
      { path: 'signIn', component: SignInComponent, title: 'Sign In' },
      { path: 'signUp', component: SignUpComponent, title: 'Sign Up' },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'verifyCode',
        component: VerifyResetCodeComponent,
        title: 'Verify Code',
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'products', component: ProductListComponent, title: 'Products' },
      {
        path: 'categories',
        component: CategoryListComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsListComponent, title: 'Brands' },
      {
        path: 'productDetails/:productName/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
      },
      { path: 'cart', component: CartListComponent, title: 'Cart' },
      {
        path: 'wishList',
        component: WishListComponent,
        title: 'Wish List',
      },
      {
        path: 'checkOut/:cartId',
        component: CheckOutComponent,
        title: 'Check Out',
      },
      { path: 'allorders', component: UserOrdersComponent, title: 'My Orders' },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
