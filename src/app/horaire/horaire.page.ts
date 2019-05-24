import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {

	idLigne
	nameLine
	colorLine
    arrets
	horaireAller
	horaireRetour
	affichageAller: string
	affichageRetour: string
	idArrete
	information
	nameArr:String

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService,
		public loadingController: LoadingController,
		
	)
	{
		
		this.route.params.subscribe(param =>{
			this.idLigne = param.id
			this.nameLine = param.nameLine
			this.colorLine = param.color
			console.log(this.idLigne)
			//this.presentLoading()
			this.apiService.getData(false,"ficheHoraire",this.idLigne).subscribe(res =>{	
				this.arrets = res[0]["arrets"]
				//this.dismissLoading()      
			},err =>{
				alert("Impossible de récupérer la ligne. vérifiez votre connection internet et réessayez")
				
				//this.dismissLoading()
			})
		})
	}

/*	async presentLoading() {
		this.loading = await this.loadingController.create({
		  spinner: null,
		  duration: 0,
		  message: 'Veuillez patienter svp...',
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});

		await loading.present();

		return await this.loading.present();
	}*/

	/*async dismissLoading() {
		

		await loading.dismiss();
	
		console.log('Loading dismissed!');
	}*/

	ngOnInit()
	{

	}

	ionViewDidEnter()
	{

	}
	  
  
	showHoraire(id)
	{
		this.router.navigate(["/horaire2",{id:this.idLigne,station:id,nameLine:this.nameLine,colorLine:this.colorLine}])
	}
	
	lectureHoraire(depart, serviceDay)
	{
		var secondes = depart + serviceDay - Math.round(Date.now()/1000)
		var minutes = Math.round(secondes/60)
		return minutes + "min"
	}

	ficheHoraire()
	{
		
		document.getElementById("ficheHoraireButton").style.display = "none"
		document.getElementById("horaires").style.display = "none"
		document.getElementById("listeArrets").style.display = "block"
	}
	AddFavorites(idArret){
		this.information = {idArret: idArret,idLine: this.idLigne}
		this.apiService.setLocalData(idArret,this.information)

		console.log("el marche",this.information)

	}
}
