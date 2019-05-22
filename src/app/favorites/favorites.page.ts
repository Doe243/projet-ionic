import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { element } from '@angular/core/src/render3';
import { ImplicitReceiver } from '@angular/compiler';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public favori: Array<{line:String,arret:String}>=[]
  arrets
  horaireAller
	horaireRetour
  affichageAller: string
	affichageRetour: string

  constructor(		private apiService: ApiService,
		private storage: Storage) { }

  ngOnInit() {
    this.affichageFavorites()
  }

  affichageFavorites(){
    this.affichageAller = this.arrets[0]["stopName"]
		this.affichageRetour = this.arrets[this.arrets.length-1]["stopName"]
    this.storage.forEach(res =>{
      console.log("1",res.idLine, res.idArret)
      this.favori.push({line:res.idLine,arret:res.idArret})
      this.horaireAller = []
      if(res[1]["times"][0])
				{
					this.horaireAller.push(res[1]["times"][0])
        }
        if(res[1]["times"][1])
				{
					this.horaireAller.push(res[1]["times"][1])
				}
				if(res[1]["times"][2])
				{
					this.horaireAller.push(res[1]["times"][2])
        }
        
        
        this.horaireRetour = []
        
        if(res[0]["times"][0])
				{
					this.horaireRetour.push(res[0]["times"][0])
				}
				if(res[0]["times"][1])
				{
					this.horaireRetour.push(res[0]["times"][1])
				}
				if(res[0]["times"][2])
				{
					this.horaireRetour.push(res[0]["times"][2])
        }
        
      //document.getElementById("horaires").style.display = "block"

    })
  }
  

  

}
