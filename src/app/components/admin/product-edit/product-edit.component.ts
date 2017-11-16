import { CategoryService } from './../../../services/category.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ProductService } from './../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id;
  product: FirebaseObjectObservable<Product>;
  categories$;

    
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router

  ) { 
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).take(1).subscribe(product=> this.product = product);
    //console.log(this.product);
  }

  ngOnInit() {
  }

  save(product){
    if(this.id){
      this.productService.update(this.id,product);
      this.router.navigate(['/admin/products']);
    } else{
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }

  }

  deleteProduct(){
    if(confirm('Are you sure?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
   
  }

}
