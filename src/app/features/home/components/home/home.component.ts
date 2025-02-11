import { Component, inject, OnInit } from '@angular/core';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { CategoriesService } from '../../../category/services/categories.service';
import { CategoriesSliderComponent } from '../../../category/components/categories-slider/categories-slider.component';
import { Category } from '../../../product/models/product';
import { Brand } from '../../../brands/models/brand';
import { BrandsService } from '../../../brands/services/brands.service';
import { BrandsSliderComponent } from '../../../brands/components/brands-slider/brands-slider.component';
import { SomeProductsComponent } from '../some-products/some-products.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    CategoriesSliderComponent,
    BrandsSliderComponent,
    SomeProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allCategories!: Category[];
  allBrands!: Brand[];
  private readonly categories = inject(CategoriesService);
  private readonly brands = inject(BrandsService);
  getAllCategories() {
    this.categories.getAllCategories().subscribe({
      next: ({ data }) => {
        this.allCategories = data;
        console.log(this.allCategories);
      },
    });
  }
  getAllBrands() {
    this.brands.getAllBrands().subscribe({
      next: ({ data }) => {
        this.allBrands = data;
        console.log(this.allBrands);
      },
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }
}
