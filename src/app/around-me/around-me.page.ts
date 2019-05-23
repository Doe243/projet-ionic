import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Router} from '@angular/router';

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
		private router:Router, 
		private apiService : ApiService,
	) 
	{ 

	}

  
	ngOnInit() {
		this.map = new L.Map('mapAroundMe');
		L.control.scale().addTo(this.map)
		//on setup ce qu'il se passe quand on tente de géolocaliser l'utilisateur
		this.map.on('locationfound', (e)=> {this.onLocationFound(e)});
		this.map.on('locationerror', (e)=> {this.onLocationError(e)});     
	}

	ionViewDidEnter(){
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 16
				attribution: '© OpenStreetMap contributors',
				maxZoom: 19
			}).addTo(this.map);
		//on géolocalise l'utilisateur
		this.map.locate({
			setView: false, 
			maxZoom: 18,
			enableHighAccuracy: true
		});
		this.map.invalidateSize()

	}

	onLocationFound(e)
	{
		console.log(e)
		this.map.setView(e.latlng,16)
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
		this.userPos.setIcon(L.icon({
			iconUrl:"assets/leaflet/marker-iconRed.png",
			shadowUrl:"assets/leaflet/marker-shadow.png"
		}))
		this.apiService.getData(false,"aroundMe",{lat:e.latitude,lng:e.longitude,distance:500}).subscribe(res=>{
			console.log(res)
			res.forEach(element => {
				this.stationMarker[element] = L.marker({lat:element.lat,lng:element.lon},).addTo(this.map)
				this.stationMarker[element].addEventListener("click", ()=>{
					var MonString : string 
					MonString = element.name
					
					if(MonString.search(",") > 0)
					{
						var deletePart = MonString.split(",")[0]
						MonString = MonString.substring(deletePart.length+2)
					}
					else if(MonString.search("-") > 0)
					{
						var deletePart = MonString.split("-")[0]
						MonString = MonString.substring(deletePart.length+2 )
					}
					this.router.navigate(["itineraire",{station:MonString}])
				})
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

	recentrer()
	{
		this.map.locate({
			setView: false, 
			maxZoom: 18,
			enableHighAccuracy: true
		});
	}
	
}
