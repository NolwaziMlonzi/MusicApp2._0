import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Genre } from './genre';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
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
   * get genre record of the param id
   * @param id
   */
  getGenre(id): Observable<Genre> {
    return this.httpClient.get<Genre>(this.apiURL + 'api/Genre/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * create a new genre
   * @param genre
   */
  createGenre(genre): Observable<Genre> {
    return this.httpClient.post<Genre>(this.apiURL + 'api/Genre/', JSON.stringify(genre), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * update record of the genre param id
   * @param id
   * @param genre
   */
  updateGenre(id, genre): Observable<Genre> {
    return this.httpClient.put<Genre>(this.apiURL + 'api/Genre/' + id, JSON.stringify(genre), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * delete genre record of a given param id
   * @param id
   */
  deleteGenre(id) {
    return this.httpClient.delete<Genre>(this.apiURL + 'api/Genre/' + id, this.httpOptions)
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
