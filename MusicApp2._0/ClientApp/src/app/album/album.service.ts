import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Album } from './album';
import { Artist } from '../artist/artist';
import { Genre } from '../genre/genre';
import { Song } from '../song/song';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {
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
   * get albums
   * 
   **/
  getAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.apiURL + 'api/Album')
      .pipe(
        catchError(this.errorHandler)
      );
  }

 /**
  * 
  * get Songs for selected Album
  * 
  **/
  getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.apiURL + 'api/Song')
      .pipe(
        catchError(this.errorHandler)
      );
  }

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
   * get genres
   * 
   **/
  getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.apiURL + 'api/Genre')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * get Album record of the param id
   * @param id
   */
  getAlbum(id): Observable<Album> {
    return this.httpClient.get<Album>(this.apiURL + 'api/Album/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * create a new Album
   * @param album
   */
  createAlbum(album): Observable<Album> {
    return this.httpClient.post<Album>(this.apiURL + 'api/Album/', JSON.stringify(album), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * update record of the album param id
   * @param id
   * @param album
   */
  updateAlbum(id, album): Observable<Album> {
    return this.httpClient.put<Album>(this.apiURL + 'api/Album/' + id, JSON.stringify(album), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * delete album record of a given param id
   * @param id
   */
  deleteAlbum(id) {
    return this.httpClient.delete<Album>(this.apiURL + 'api/Album/' + id, this.httpOptions)
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
