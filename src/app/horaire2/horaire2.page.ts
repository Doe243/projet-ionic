import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-horaire2',
  templateUrl: './horaire2.page.html',
  styleUrls: ['./horaire2.page.scss'],
})
export class Horaire2Page implements OnInit {

  ligne
  arret
  nameLine
  colorLine
  nameArret
  horaireAller
  horaireRetour
  loading
  information

  affichageAller
  affichageRetour
  noFav = "block"
  fav = "none"
  public favori: Array<{idArret:String,idLine:String,nameLine:String,color:String,NameArret:String}>=[]

  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private apiService: ApiService,
    public loadingController: LoadingController,
    private storage: Storage
  ) {
    this.route.params.subscribe(param =>{
			this.ligne = param.id
      this.arret = param.station
      this.nameLine = param.nameLine
      this.colorLine = param.colorLine
      this.presentLoading();
			this.apiService.getData(false,"horaireArret",{ arret:this.arret,ligne:this.ligne }).subscribe(res =>
        {
          console.log("yyy",res)
          console.log(res.length)
          this.affichageAller = res[0]["pattern"]["desc"]
          if(res.length==2){
          this.affichageRetour = res[1]["pattern"]["desc"]
          }
          this.nameArret = res[0].times[0].stopName
          this.horaireAller = []
          if(res.length==2){
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
    
          this.dismissLoading();
        },err =>{
				alert("Impossible de récupérer les horaires. vérifiez votre connection internet et réessayez")
				
      })
    })
    

   }

  ngOnInit() {
    
  }

  ionViewDidEnter()
  {
    this.storage.forEach(res =>{
      if(this.arret==res.idArret){
        console.log("egal")
        this.noFav = "none"
        this.fav = "block"
      }
    })
  }

  async presentLoading() 
  {
		this.loading = await this.loadingController.create({
		  spinner: null,
		  duration: 10000,
		  message: 'Veuillez patienter svp...',
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});

    console.log('Loading present');
    
    this.loading.onDidDismiss().then(res => 
      {
        console.log("Dégage!!!");

        if(!this.affichageAller && !this.affichageRetour)
        { 
          alert("Nous n'avons pu récupérer les données\nVeuillez vérifier votre connexion internet svp");

        }
      });

    return await this.loading.present();
    }
    

  async dismissLoading() 
  {
		
		await this.loading.dismiss();
	
		console.log('Loading dismissed!');
  }
  
  AddFavorites(idArret){
		this.information = {idArret: idArret,idLine: this.ligne,nameLine:this.nameLine,colorLine:this.colorLine,nameArret:this.nameArret}
    this.apiService.setLocalData(idArret,this.information)
    this.noFav = "none"
    this.fav = "block"
  }
  RemoveFavorites(idArret){
    this.storage.remove(idArret)
    this.noFav = "block"
    this.fav = "none"
  }
  
  
	lectureHoraire(depart, serviceDay)
	{
		var secondes = depart + serviceDay - Math.round(Date.now()/1000)
		var minutes = Math.round(secondes/60)
		return minutes + "min"
  }
  
  ficheHoraire()
  {
    this.router.navigate(["/horaire",{id:this.ligne}])
  }
}
