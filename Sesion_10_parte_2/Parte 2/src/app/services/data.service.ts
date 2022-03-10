import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  /**
   * Método para obtener un chiste aleatorio de ChuckNorris
   * @returns {Observable<any>} JSON con chiste de ChuckNorris aleatorio
   */
  obtenerFraseAleatoria(){
    return this._http.get('https://api.chucknorris.io/jokes/random');
  }
}
