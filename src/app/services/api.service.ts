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
        return this.http.get(`${API_URL}/linesNear/json?x=${objet['lng']}&y=${objet['lat']}&dist=${objet['distance']}&details=true`).pipe(
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
      else if (requeteType == "horaireArret")
      {
        return this.http.get(`${API_URL}/routers/default/index/stops/SEM:${objet}/stoptimes`).pipe(
          map(res =>
            res
          )
        )
      }
      else if (requeteType == "ficheHoraire")
      {
        return this.http.get(`${API_URL}/ficheHoraires/json?route=SEM:${objet}`).pipe(
          map(res =>
            res
          )
        )
      }
      
    }
   
}

//export var reponse;