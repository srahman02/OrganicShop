import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input ('shopping-cart') shoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  addToCart(){
    this.cartService.addToCart(this.product);
    console.log('+add to cart component');
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
    console.log('-add to cart component');
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.$key];
    return item? item.quantity : 0;
  }
}
