import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( 
    private http: HttpClient,
    private messageService: MessageService ) { }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }

  private itemsUrl = 'http://localhost:4040/api/item';  // URL to web api

  getItems(): Observable<Item[]> {
    this.messageService.add('ItemService: fetched items');
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError('getItems', []))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  /** POST: add a new item to the server */
  addItem (item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions).pipe(
      tap((item: Item) => this.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /* filter items with startDate and endDate */
  filterItems(startDate: string, endDate: string): Observable<Item[]> {
    startDate.trim();
    endDate.trim();
    return this.http.get<Item[]>(`${this.itemsUrl}/?startdate=${startDate}&enddate=${endDate}`).pipe(
      tap(_ => this.log(`found Items start at "${startDate}", ends at "${endDate}"`)),
      catchError(this.handleError<Item[]>('filterItems', []))
    );
  }


  /** DELETE: delete the item from the server */
  deleteItem (item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: update the item on the server */
  updateItem (item: Item): Observable<any> {
    return this.http.put(this.itemsUrl, item, httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
