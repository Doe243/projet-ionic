import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { element } from '@angular/core/src/render3';
import { ImplicitReceiver } from '@angular/compiler';
import { RSA_X931_PADDING } from 'constants';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
<<<<<<< HEAD
  public favori: Array<{line:String,arret:String,nameArret:String}>=[]
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
<<<<<<< HEAD
  cant = 0
  lineReplace:String
  lineSave:String
  d1:boolean
  d2:boolean
  

  test 
  //VARIABLES FOR CREATE ARRAY favorites
  idArretString:String
  idLineString:String
  nameLineString:string
  colorString:String
  nameArretString:String
  public linesSave: Array<{name:String,color:String}>=[]
  public arretsSave: Array<{name:String}>=[]
  public linesSave2: Array<{name:String,color:String}>=[]
  x1:String
  x2:String
  x3:string

=======
>>>>>>> parent of f0f94f0... avance2 favorites

  constructor(		private apiService: ApiService,
		private storage: Storage) { 
      this.storage.keys().then(res =>{
      })
    }

  ngOnInit() {
    this.takeStorage()
  }

  public takeStorage(){
<<<<<<< HEAD
    this.storage.clear()
    this.storage.length().then(result =>{
      this.storage.forEach(res =>{
        this.favori.push({line:res.idLine,arret:res.idArret,nameArret:res.nameArret})
=======
    
    this.storage.length().then(result =>{
      this.storage.forEach(res =>{
        console.log("1",res.idLine, res.idArret)
        this.favori.push({line:res.idLine,arret:res.idArret})
>>>>>>> parent of f0f94f0... avance2 favorites
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
<<<<<<< HEAD
    this.nameArretString = ""
    this.nameLineString = ""
    this.colorString = ""
    
    this.favori.forEach(res=>{
      this.lineSave = res.line
      this.lineReplace = this.lineSave.replace(/:/g, "_")
      this.idArretString = res.arret
      this.idLineString = res.line
      this.nameArretString = res.nameArret
      this.favorites.push({
        idArret:this.idArretString,
        idLine:this.idLineString,
        nameLine:this.nameLineString,
        NameArret:this.nameArretString,
        color:this.colorString
      })
    })
    console.log(this.favorites)
    
  }
  saveInfo(){
    var i
    for(i=0; i<=this.favori.length; i++){
      console.log(this.favori[i].arret)
      console.log(this.favori[i].line)
      console.log(this.linesSave[i].name)
      console.log(this.arretsSave[i].name)
      console.log(this.linesSave[i].color)
      /*this.favorites.push({
        idArret:this.favori[i].arret,
        idLine:this.favori[i].line,
        nameLine:this.linesSave[i].color,
        NameArret:this.arretsSave[i].name,
        color:this.linesSave[i].color
      })*/
    }
=======
    
>>>>>>> parent of f0f94f0... avance2 favorites
  }
  

  

}
