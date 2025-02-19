import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../models/brand';
import { BrandsCardComponent } from '../brands-card/brands-card.component';

@Component({
  selector: 'app-brands-list',
  imports: [BrandsCardComponent],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent implements OnInit {
  brandsService = inject(BrandsService);
  brandsList: Brand[] = [] as Brand[];
  getBrandsList(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
    });
  }
  ngOnInit(): void {
    this.getBrandsList();
  }
}
