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

  delete(producto : Producto): void{
    this.productos = this.productos.filter(h => h !== producto);
    this.productoService.deleteProducto(producto.id).subscribe();
  }

  add (idprod : string, nombre : string, valor : string): void {
    console.log(idprod, nombre, valor);
    if (!idprod || !nombre || !valor ) { return; }
    let newProd : Producto = { id: parseInt(idprod), nombre: nombre ,valor: parseInt(valor)};
    this.productoService.addProducto(newProd)
      .subscribe(producto => {
        this.productos.push(producto);
      });
  }

}
