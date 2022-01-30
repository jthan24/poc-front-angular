import { Component, OnInit } from '@angular/core';
import { Producto } from '../product';
import { ProductoService } from '../producto.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos : Producto[] = [];
  selectedProducto?: Producto;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  onSelect(producto: Producto): void{
    this.selectedProducto = producto;
  }

  getProductos(): void{
    this.productoService.getProductos()
      .subscribe(productos => this.productos = productos);
  }

}
