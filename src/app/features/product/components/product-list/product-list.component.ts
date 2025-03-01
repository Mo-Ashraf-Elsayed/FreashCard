import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../../cart/services/cart.service';
import { WishListService } from '../../../wishList/services/wish-list.service';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { MetaData } from '../../models/meta-data';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, SearchPipe, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly wishListService = inject(WishListService);
  productList: WritableSignal<Product[]> = signal([]);
  metadata: MetaData = {} as MetaData;
  wishListArr = computed(() => this.wishListService.wishListArr());
  isAdded: boolean = false;
  searchTerm: string = '';
  @ViewChildren('link') pagesLinks!: QueryList<ElementRef>;
  paginationLinks(num: number) {
    let arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }
  choseLimit(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.getAllProducts(+selectedValue, 1);
    }
  }
  addActiveLink(event: any) {
    console.log(event.target);
    let element = event.target as HTMLElement;
    this.pagesLinks.forEach((element) => {
      let ele = element.nativeElement as HTMLElement;
      ele.classList.remove('bg-mainColor', 'border-mainColor', 'text-white');
    });
    element.classList.add('bg-mainColor', 'border-mainColor', 'text-white');
  }
  getAllProducts(limit: number, page: number) {
    this.productService.getProducts(limit, page).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.metadata = res.metadata;
      },
    });
  }
  getWishList() {
    this.wishListService.getUserWishList().subscribe({
      next: ({ data }) => {
        this.wishListService.wishListArr.set(data);
      },
    });
  }
  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.cartService.cartItems.set(res.numOfCartItems);
      },
    });
  }
  isProductAddedtoWishList(productId: string): boolean {
    for (let i = 0; i < this.wishListArr().length; i++) {
      if (this.wishListArr()[i]._id === productId) {
        return true;
      } else if (typeof this.wishListArr()[i] === 'string') {
        if ((this.wishListArr()[i] as unknown as string) === productId) {
          return true;
        }
      }
    }
    return false;
  }
  toggleFromWishList(productId: string): void {
    if (this.isProductAddedtoWishList(productId)) {
      this.wishListService.removeProductFromWishList(productId).subscribe({
        next: ({ data }) => {
          this.wishListService.wishListLength.set(data.length);
          this.wishListService.wishListArr.set(data);
        },
      });
    } else {
      this.wishListService.addProductToWishList(productId).subscribe({
        next: ({ data }) => {
          this.wishListService.wishListLength.set(data.length);
          this.wishListService.wishListArr.set(data);
        },
      });
    }
  }
  ngOnInit() {
    this.getAllProducts(40, 1);
    this.getWishList();
  }
}
