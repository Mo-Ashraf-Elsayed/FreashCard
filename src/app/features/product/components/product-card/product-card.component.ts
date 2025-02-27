import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../../wishList/services/wish-list.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() place: string = '';
  wishListArr = computed(() => this.wishListService.wishListArr());
  @Output() toCart = new EventEmitter<string>();
  @Output() toWishList = new EventEmitter<string>();
  wishListService = inject(WishListService);
  isProductAddedtoWishList(): boolean {
    for (let i = 0; i < this.wishListArr().length; i++) {
      if (this.wishListArr()[i]._id === this.product._id) {
        return true;
      } else if (typeof this.wishListArr()[i] === 'string') {
        if ((this.wishListArr()[i] as unknown as string) === this.product._id) {
          return true;
        }
      }
    }
    return false;
  }
}
