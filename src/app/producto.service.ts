import { Injectable } from '@angular/core';
import { Producto } from './product';
import { PRODUCTOS } from './mock-products';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private messageService: MessageService) { }

  getProductos(): Observable<Producto[]>{
    const productos = of(PRODUCTOS);
    this.messageService.add('ProductoService: fetched productos');
    return productos;
  }
}
