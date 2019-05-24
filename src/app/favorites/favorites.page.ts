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
  public favorites: Array<{idArret:String,idLine:String,nameLine:String,color:String,NameArret:String}>=[]
=======
  public favori: Array<{line:String,arret:String}>=[]
  public favori2: Array<{line:String,arret:String}>=[]
>>>>>>> parent of f0f94f0... avance2 favorites
  arrets
  horaireAller
	horaireRetour
  affichageAller: string
  affichageRetour: string
  cantSto  = 0
  lineReplace:String
  lineSave:String

  constructor(		private apiService: ApiService,
		private storage: Storage) { }

  ngOnInit() {
    this.takeStorage()
  }

  public takeStorage(){
    this.storage.length().then(result =>{
      this.storage.forEach(res =>{
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
      this.lineSave = res.line
      this.lineReplace = this.lineSave.replace(/:/g, "_")
      this.apiService.getData(false,"lineInfo",this.lineReplace).subscribe(ret=>{
        console.log(ret)
        console.log(ret.features[0].properties.NUMERO)
        console.log(ret.features[0].properties.COULEUR)
      })

    })
  }


  

  

}
