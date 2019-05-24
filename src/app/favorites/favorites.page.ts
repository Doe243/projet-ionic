import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { element } from '@angular/core/src/render3';
import { ImplicitReceiver } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public favori: Array<{idArret:String,idLine:String,nameLine:String,color:String,NameArret:String}>=[]
  public favorites: Array<{idArret:String,idLine:String,nameLine:String,color:String,NameArret:String}>=[]
  public favori2: Array<{line:String,arret:String}>=[]
  arrets
  horaireAller
	horaireRetour
  affichageAller: string
  affichageRetour: string
  cantSto  = 0
  lineReplace:String
  lineSave:String

  constructor(		private apiService: ApiService,
		private storage: Storage, 
    private router:Router) { }

  ngOnInit() {
    
  }

  ionViewDidEnter()
  {
    this.favori = []
    this.storage.forEach(res =>{
      console.log(res)
      this.favori.push({idLine:res.idLine,idArret:res.idArret,nameLine:res.nameLine,color:res.colorLine,NameArret:res.nameArret})
    })
  }

  takeHoraires(idLigne,id,idArret,nameLine,color){
    this.router.navigate(["/horaire2",{id:idLigne,station:id,nameLine:nameLine,colorLine:color}])
  }


  

  

}
