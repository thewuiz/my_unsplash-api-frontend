import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Image } from '@models/image';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlEndPoint = environment.base_url;
  public arrayImages: EventEmitter<Image[]> = new EventEmitter<Image[]>();

  constructor(private http: HttpClient) {}

  addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(`${this.urlEndPoint}/image/url`, image).pipe(
      map((response: any) => {
        return response.image as Image;
      })
    );
  }

  deleteImage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/image/${id}`);
  }

  getAllImagesUser(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.urlEndPoint}/image/images`).pipe(
      map((response: any) => {
        return response.results as Image[];
      })
    );
  }

  getImagesBySearch(search: string): Observable<Image[]> {
    let params = new HttpParams();
    params = params.set('search', search);

    return this.http
      .get<Image[]>(`${this.urlEndPoint}/image/search/`, { params })
      .pipe(
        map((response: any) => {
          return response as Image[];
        })
      );
  }
}
