import { Routes } from '@angular/router';
import { VisitorLayoutComponent } from './core/layout/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { CategoriesComponent } from './features/category/components/categories/categories.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { BarndsComponent } from './features/brands/components/barnds/barnds.component';
import { ProductDetailsComponent } from './features/product/components/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      { path: '', redirectTo: 'signIn', pathMatch: 'full' },
      { path: 'signIn', component: SignInComponent },
      { path: 'signUp', component: SignUpComponent },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BarndsComponent },
      {
        path: 'productDetails/:productName/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
];
