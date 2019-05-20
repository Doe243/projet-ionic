import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-itineraire',
  templateUrl: 'itineraire.page.html',
  styleUrls: ['itineraire.page.scss']
})
export class ItinerairePage implements OnInit {
  map:L.Map
  depart: L.Marker
  arriver: L.Marker
  arretDepart: string
  arretArriver: string

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

  underStation()
  {
      this.apiService.getData(false, "itineraire", this.arretDepart).subscribe(res =>{
        console.log(res)
        if(res.length > 0) {
         //
        }
      })
    

  }

}
