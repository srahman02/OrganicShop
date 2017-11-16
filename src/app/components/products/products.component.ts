import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from './../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products$;
  products: Product[]=[];
  filteredProducts:Product[]=[];

  category:string;
  cart: any;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {

    this.productService.getAllProducts().switchMap(p=>{
      this.products = p;
      return route.queryParamMap;})
      .subscribe(params=>{
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p=> p.category === this.category) : this.products;

      });
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart())
    .subscribe(cart=> this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
