import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoryService = inject(CategoriesService);
  categoryList: Category[] = [];
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: ({ data }) => {
        console.log(data);
        this.categoryList = data;
      },
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
}
