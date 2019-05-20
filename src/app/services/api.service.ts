import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
  
const API_URL = 'http://data.metromobilite.fr/api'; //API



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor
  (
    private http: HttpClient 
    
    ) {
    
    }
 
  getData(forceRefresh: boolean = false, requeteType: string = "base", objet: any = null): Observable<any> {     
      // Return real API data and store it locally
      
      if (requeteType == "lines")
      {
        return this.http.get(`${API_URL}/routers/default/index/routes`).pipe(
          map(lines => 
            lines
          )
        )
        
      }
      else if (requeteType == "aroundMe")
      {
        return this.http.get(`${API_URL}/linesNear/json?x=${objet['lng']}&y=${objet['lat']}&dist=500&details=true`).pipe(
          map(res => 
            res 
          )
        )
      }
      else if (requeteType == "itineraire")
      {
        return this.http.get(`${API_URL}/findType/json?types=arret&query=${objet}`).pipe(
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