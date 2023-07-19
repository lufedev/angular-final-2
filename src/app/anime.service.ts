import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = 'https://kitsu.io/api/edge';

  constructor(private http: HttpClient) { }

  getAnimes(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page[limit]', pageSize.toString())
      .set('page[offset]', ((page - 1) * pageSize).toString());

    return this.http.get<any>(`${this.apiUrl}/anime`, { params });
  }
  searchAnimes(searchTerm: string): Observable<any> {
    const url = `${this.apiUrl}/anime?filter[text]=${searchTerm}`;
    return this.http.get<any>(url);
  }
  getAnimeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/anime/${id}`);
  }
  getAnimeBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/anime?filter[slug]=${slug}`);
  }
}
