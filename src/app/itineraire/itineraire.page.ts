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
      this.map = new L.Map('map').setView([48.833, 2.333], 7); // LIGNE 14

      
  }

  ionViewDidEnter(){
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 16
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
      });
  
      this.map.addLayer(osmLayer);
  }

}
