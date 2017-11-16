import { Product } from './../../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product:{
   
  };
  //categories:any[];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

  this.categories$ = categoryService.getCategories();
  // this.id = this.route.snapshot.paramMap.get('id');
  // if(this.id){
  //  this.productService.getProduct(this.id).take(1).subscribe(product=>{
  //   this.product = product;
  //   });
  // }

  }

  ngOnInit() {
  }

  save(product){
    //if(this.id) this.productService.update(this.id,product);
    //else 
    this.productService.create(product);

    this.router.navigate(['/admin/products']);

  }

}
