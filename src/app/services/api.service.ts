import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
  
const API_URL = 'http://demo.geonature.fr/geonature/api'; //API



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor
  (
    private http: HttpClient, 
    private storage: Storage, 
    
    ) {
    
    }
 
  getData(forceRefresh: boolean = false, requeteType: string = "base", id: number = 0): Observable<any> {     
      // Return real API data and store it locally
      
      if (requeteType == "base")
      {
        return this.http.get(`${API_URL}/sites?id_application=7&id_area_type=25`).pipe(
          map(res => 
            res['features']
          )
        )
      }
      else if (requeteType == "visite")
      {
        return this.http.get(`${API_URL}/sites?id_base_site=${id}`).pipe(
          map(res => 
            res['features']
          )
        )
      }
      else if (requeteType == "maille")
      {
        return this.http.get(`${API_URL}/gn_monitoring/siteareas/${id}?id_area_type=32`).pipe(
          map(res => 
            res['features']
          )
        )
      }
      else if (requeteType == "observeur")
      {
        return this.http.get(`${API_URL}/users/menu/1`).pipe(
          map(res =>
            [res]
          )
        )
      }
      else if (requeteType == "perturbations")
      {
        return this.http.get(`${API_URL}/nomenclatures/nomenclature/TYPE_PERTURBATION?regne=&group2_inpn=&orderby=label_default`).pipe(
          map(res =>
            res['values']
          )
        )
      }
      
    }
}

//export var reponse;