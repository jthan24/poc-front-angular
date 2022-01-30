import { Injectable } from '@angular/core';
import { Producto } from './product';
import { PRODUCTOS } from './mock-products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  getProductos(): Observable<Producto[]>{
    const productos = of(PRODUCTOS);
    return productos;
  }
}
