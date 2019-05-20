import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-itineraire',
  templateUrl: 'itineraire.page.html',
  styleUrls: ['itineraire.page.scss']
})
export class ItinerairePage implements OnInit {
  map:L.Map

  ngOnInit() {
      this.map = new L.Map('mapItineraire').setView({lat:45.1936167,lng:5.7191462},11);   
  }

  ionViewDidEnter(){
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
      }).addTo(this.map);
  
  }

}
