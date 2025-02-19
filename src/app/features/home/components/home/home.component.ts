import { Component } from '@angular/core';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { CategorySliderComponent } from '../../../category/components/category-slider/category-slider.component';
import { ProductListComponent } from '../../../product/components/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, CategorySliderComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
