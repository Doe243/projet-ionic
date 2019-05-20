import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-around-me',
  templateUrl: './around-me.page.html',
  styleUrls: ['./around-me.page.scss'],
})
export class AroundMePage implements OnInit {
	map:L.Map
	userPos: L.Marker
	stationMarker: L.Marker[] = []
	constructor
	(
		private apiService : ApiService
	) 
	{ 

	}

  
	ngOnInit() {
		this.map = new L.Map('mapAroundMe'); // LIGNE 14
		//on setup ce qu'il se passe quand on tente de géolocaliser l'utilisateur
		this.map.on('locationfound', (e)=> {this.onLocationFound(e)});
		this.map.on('locationerror', (e)=> {this.onLocationError(e)});
		console.log("stationmarker",this.stationMarker)     
	}

	ionViewDidEnter(){
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 16
				attribution: '© OpenStreetMap contributors',
				maxZoom: 19
			}).addTo(this.map);
		//on géolocalise l'utilisateur
			this.map.locate({
				setView: true, 
				maxZoom: 16,
				enableHighAccuracy: true
			});

	}

	onLocationFound(e)
	{
		console.log(e)
		if(this.userPos)
		{
			this.userPos.remove()
		}
		if(this.stationMarker.length > 0)
		{
			for(var i=0; i<this.stationMarker.length; i++)
			{
				this.stationMarker[i].remove()
			}			
		}
		this.userPos = L.marker(e.latlng,).addTo(this.map)
		this.apiService.getData(false,"aroundMe",{lat:e.latitude,lng:e.longitude}).subscribe(res=>{
			console.log('xxx',res)
			res.forEach(element => {
				this.stationMarker[element] = L.marker({lat:element.lat,lng:element.lon},).addTo(this.map)
			});
		})
	}

	onLocationError(e)
	{
		//on met par defaut la map de grenoble
		console.error(e.message)//on vois le message d'erreur sur la console
			alert(e.message + "\rNous allons afficher la carte par défaut");//on dit pourquoi on as pas trouver l'utilisateur
		this.map.setView({lat:45.1936167,lng:5.7191462},11)
	}
}
