import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-itineraire',
  templateUrl: 'itineraire.page.html',
  styleUrls: ['itineraire.page.scss']
})
export class ItinerairePage implements OnInit {
	stationMarker: L.Marker[] = []
  map:L.Map
  depart: L.Marker
  arriver: L.Marker
  arretDepart: string
  arretArriver: string
  time: string
  date: string

  coordones1LA;
  coordones1LO;
  coordones2LA;
  coordones2LO;

  constructor
	(
		private apiService : ApiService
	) 
	{ 

	}

  ngOnInit() {
      this.map = new L.Map('mapItineraire').setView({lat:45.1936167,lng:5.7191462},16);   
  }

  ionViewDidEnter()
  {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 20
      }).addTo(this.map);
      this.map.invalidateSize();
  
  }

  chercheDepart()
  {
      this.apiService.getData(false, "itineraire", this.arretDepart).subscribe(res =>{
        console.log("tout",res)
        res.forEach(element => {
          this.coordones1LA = element.geometry.coordinates[0]
          this.coordones1LO = element.geometry.coordinates[1]
        });
        this.ChercheArriver()
      })
      
  }
  ChercheArriver(){
    this.apiService.getData(false, "itineraire", this.arretArriver).subscribe(res =>{
      console.log("tout",res)
      res.forEach(element => {
        this.coordones2LA = element.geometry.coordinates[0]
        this.coordones2LO = element.geometry.coordinates[1]
        
      });
      this.chercheItineraire()
    })
  }

  chercheItineraire(){
    this.apiService.getData(false,"rechercheItineraire",{lngD:this.coordones1LO,latD:this.coordones1LA,
      lngA:this.coordones2LO,latA:this.coordones2LA,time:this.time,date:this.date}).subscribe(res =>{
        console.log("il marche",res);
      })
  }

}
