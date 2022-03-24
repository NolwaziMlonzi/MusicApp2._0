import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Artist } from './artist';
import { Album } from '../album/album';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  // constructor(@Inject('BASE_URL') baseUrl: string) { }

  private apiURL = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.apiURL = baseUrl; }

  /**
   * 
   * get artists
   * 
   **/
  getArtists(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(this.apiURL + 'api/Artist')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
  * 
  * get albums to be filtered by artist album ID
  * 
  **/
  getAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.apiURL + 'api/Album')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * get artist record of the param id
   * @param id
   */
  getArtist(id): Observable<Artist> {
    return this.httpClient.get<Artist>(this.apiURL + 'api/Artist/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * create a new artist
   * @param artist
   */
  createArtist(artist): Observable<Artist> {
    return this.httpClient.post<Artist>(this.apiURL + 'api/Artist/', JSON.stringify(artist), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * update record of the artist param id
   * @param id
   * @param artist
   */
  updateArtist(id, artist): Observable<Artist> {
    return this.httpClient.put<Artist>(this.apiURL + 'api/Artist/' + id, JSON.stringify(artist), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * delete artist record of a given param id
   * @param id
   */
  deleteArtist(id) {
    return this.httpClient.delete<Artist>(this.apiURL + 'api/Artist/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * handle errors and return in a meaningful and descriptive form
   * @param error
   */
  errorHandler(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
