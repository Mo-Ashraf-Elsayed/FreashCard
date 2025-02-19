import { Component, inject, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css',
})
export class CategorySliderComponent implements OnInit {
  categoryList: Category[] = [];
  private readonly categories = inject(CategoriesService);
  getAllCategories() {
    this.categories.getAllCategories().subscribe({
      next: ({ data }) => {
        this.categoryList = data;
        console.log(this.categoryList);
      },
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fas fa-angle-left fa-2x"></i>',
      '<i class="fas fa-angle-right fa-2x"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      600: {
        items: 3,
      },
      800: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
    nav: false,
  };
}
