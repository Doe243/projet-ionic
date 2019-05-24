import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-horaire2',
  templateUrl: './horaire2.page.html',
  styleUrls: ['./horaire2.page.scss'],
})
export class Horaire2Page implements OnInit {

  ligne
  arret
  horaireAller
  horaireRetour
  loading
  information

  affichageAller
  affichageRetour

  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private apiService: ApiService,
		public loadingController: LoadingController,
  ) {
    this.route.params.subscribe(param =>{
			this.ligne = param.id
      this.arret = param.station
      this.presentLoading();
			this.apiService.getData(false,"horaireArret",{arret:this.arret,ligne:this.ligne}).subscribe(res =>
        {
          //this.presentLoading();
    
          console.log(res)
          this.affichageAller = res[0]["pattern"]["desc"]
          this.affichageRetour = res[1]["pattern"]["desc"]
          
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
    
          this.dismissLoading();
        },err =>{
				alert("Impossible de récupérer les horaires. vérifiez votre connection internet et réessayez")
				console.log(err)
			})
		})
   }

  ngOnInit() {
    
  }

  async presentLoading() {
		this.loading = await this.loadingController.create({
		  spinner: null,
		  duration: 0,
		  message: 'Veuillez patienter svp...',
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});

		console.log('Loading present');

		return await this.loading.present();
	  }

	async dismissLoading() {
		

		await this.loading.dismiss();
	
		console.log('Loading dismissed!');
  }
  
  AddFavorites(idArret){
		this.information = {idArret: idArret,idLine: this.ligne}
		this.apiService.setLocalData(idArret,this.information)
		console.log("el marche22",this.information)
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
