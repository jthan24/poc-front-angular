import { Component, OnInit } from '@angular/core';
import { Producto } from '../product';
import { ProductoService } from '../producto.service';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos : Producto[] = [];
  selectedProducto?: Producto;

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  onSelect(producto: Producto): void{
    this.selectedProducto = producto;
    this.messageService.add(`ProductoComponent: Producto id=${producto.id}`);
    console.log(producto)
  }

  getProductos(): void{
    this.productoService.getProductos()
      .subscribe(productos => this.productos = productos);
  }

}
