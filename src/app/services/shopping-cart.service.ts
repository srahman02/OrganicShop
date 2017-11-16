import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';
import { Product } from './../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  // async getCart(): Promise<Observable<ShoppingCart>>{
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/'+cartId)
  //   .map(x=>new ShoppingCart(x));

  // }
  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);

  }
  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-carts/'+cartId +'/items/'+ productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;


  }
  async addToCart(product: Product){
    console.log('+ add to cart service');
    this.updateItemQuantity(product,1);
        // if(item.$exists())item$.update({quantity: item.quantity+1});
        // else item$.set({product: product, quantity: 1});

  }

  async removeFromCart(product: Product){
    console.log('- add to cart service');
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product:Product, change:number){
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);

    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item=>{
      console.log(item);

      item$.update({product: product, quantity:(item.quantity||0) + change});
    });
  }



}
