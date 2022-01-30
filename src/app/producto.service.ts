import { Injectable } from '@angular/core';
import { Producto } from './product';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productosUrl = "http://localhost:5000";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.productosUrl)
      .pipe(
        tap(_ => this.log('Obteniedo productos')),
        catchError(this.handleError<Producto[]>('getProductos', []))
      )
  }

  private log(message: string){
    this.messageService.add(`ProductoService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      //this.messageService.add('Ha fallado la comunicacion con el servidor para obtener productos');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getProducto(id: number): Observable<Producto> {
    const url = `${this.productosUrl}/producto/${id}`;
    return this.http.get<Producto>(url)
      .pipe(
        tap(_ => this.log(`Obteniendo producto id=${id}`),
        catchError(this.handleError<Producto>(`getProducto id=${id}`))
        )
      );
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto, this.httpOptions)
      .pipe(
        tap((newProducto: Producto) => this.log(`Agregando nuevo producto w/ id=${newProducto.id}`)),
        catchError(this.handleError<Producto>('addProducto'))
      );
  }

  deleteProducto(id: number): Observable<Producto>{
    const url = `${this.productosUrl}/producto/${id}`;
    return this.http.delete<Producto>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Eliminando producto id=${id}`)),
        catchError(this.handleError<Producto>('deleteProducto'))
      );
  }

}
