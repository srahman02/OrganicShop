import { ShoppingCart } from './../../models/shopping-cart';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { AppUser } from './../../models/app-user';
import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  shoppingCartItemsCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart=>{
      this.shoppingCartItemsCount = 0;
      for (let productId in cart.items)
      this.shoppingCartItemsCount += cart.items[productId].quantity;
    });
  }

  logout() {
    this.auth.logout();
  }

}
