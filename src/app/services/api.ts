import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = '/.netlify/functions';
  
  // Store the navigation data as a BehaviorSubject (starts empty)
  private navListSubject = new BehaviorSubject<any[]>([]);
  private navList = this.navListSubject.asObservable();

  constructor(private http: HttpClient) { }

  // call API and also cache the result
  getNav(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/navigation`).pipe(
      tap(result => {
        this.navListSubject.next(result) // ✅ save result locally
      })
    );
  }

  // optional: get cached data without API call
  getCachedNav(): Observable<any> {
    return this.navList;
  }
}
