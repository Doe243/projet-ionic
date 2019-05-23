import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { Storage } from '@ionic/storage';
  
const API_URL = 'http://data.metromobilite.fr/api'; //API



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor
  (
    private http: HttpClient,
    private storage: Storage 
    
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
        return this.http.get(`${API_URL}/routers/default/index/clusters/${objet.arret}/stoptimes?route=${objet.ligne}`).pipe(
          map(res =>
            res
          )
        )
      }
      else if (requeteType == "ficheHoraire")
      {
        return this.http.get(`${API_URL}/ficheHoraires/json?route=${objet}`).pipe(
          map(res =>
            res
          )
        )
      }else if (requeteType == "rechercheItineraire")
      {
        return this.http.get(`${API_URL}/routers/default/plan?routerId=prod&mode=WALK,TRANSIT&showIntermediateStops=true&minTransferTime=60&transferPenalty=60&numItineraries=2&walkBoardCost=300&bikeBoardCost=600&fromPlace=${objet['lngD']},${objet['latD']}&toPlace=${objet['lngA']},${objet['latA']}&arriveBy=false&time=${objet['time']}&date=${objet['date']}&ui_date=&walkSpeed=1.1112&walkReluctance=5&locale=fr_FR`).pipe(
          map(res =>
            res
          )
        )
      }else if (requeteType == "listLieu")
      {
        return this.http.get(`${API_URL}/find/json?query=${objet}&types=arret,lieux,rues`).pipe(
          map(res =>
            res
          )
        )
      }
      
    }
     // Save result of API requests
  public setLocalData(key, data) {
    //this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
    this.storage.set(`${key}`, data);
  }
 
  // Get cached API result
  public getLocalData(key) {
    //return this.storage.get(`${API_STORAGE_KEY}-${key}`);
    return this.storage.get(`${key}`);
    
  }
   
}

//export var reponse;