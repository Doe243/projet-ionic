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
  public favori2: Array<{line:String,arret:String}>=[]
  arrets
  horaireAller
	horaireRetour
  affichageAller: string
  affichageRetour: string
  cantSto  = 0

  constructor(		private apiService: ApiService,
		private storage: Storage) { }

  ngOnInit() {
    this.takeStorage()
  }

  public takeStorage(){
    
    this.storage.length().then(result =>{
      this.storage.forEach(res =>{
        console.log("1",res.idLine, res.idArret)
        this.favori.push({line:res.idLine,arret:res.idArret})
        this.cantSto++
        console.log("valeurs",this.cantSto,result)
        //document.getElementById("horaires").style.display = "block"
        if(this.cantSto==result){
          console.log("if")
          this.takeFicheHoraire()
        }
      })
      });
    
    return this.favori
  }

  takeFicheHoraire(){
    this.favori.forEach(res=>{
      this.apiService.getData(false,"ficheHoraire",res.line).subscribe(res =>{				
        console.log(res[0])
    this.arrets = res[0]["arrets"]
    })
  }
  

  

}
