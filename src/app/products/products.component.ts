import { Component, OnInit } from '@angular/core';
import { Producto } from '../product';
import { PRODUCTOS } from '../mock-products';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos = PRODUCTOS;
  selectedProducto?: Producto;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(producto: Producto): void{
    this.selectedProducto = producto;
  }

}
