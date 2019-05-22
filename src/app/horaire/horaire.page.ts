import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';
//import { element } from '@angular/core/src/render3';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {
//dans la récupération de l'api:
	//faut faire "serviceDay"+"scheduledDeparture" pour avoir le timestamp
	
	idLigne
  	arrets
	horaireAller
	horaireRetour
	affichageAller: string
	affichageRetour: string

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService,
		public loadingController: LoadingController
	)
	{
		/*let loading = await this.loadingController.create({
			message: 'Patientez svp...',
			duration: 2000
		  });*/

		  //await loading.present();

		this.route.params.subscribe(param =>{
			this.idLigne = param.id
			
			this.apiService.getData(false,"ficheHoraire",this.idLigne).subscribe(res =>{
				//await loading.onDidDismiss();
				
        		console.log(res[0])
				this.arrets = res[0]["arrets"]        
			},err =>{
				alert("Impossible de récupérer la ligne. vérifiez votre connection internet et réessayez")
				console.log(err)
			})
		})
	}

	async presentLoading() {
		const loading = await this.loadingController.create({
		  message: 'Veuillez patienter svp..',
		  duration: 3000
		});

		await loading.present();

	
		console.log('Loading present!');
	}

	async dismissLoading() {
		const loading = await this.loadingController.create({
		  message: 'Veuillez patienter svp..',
		  duration: 3000
		});

		await loading.dismiss();
	
		console.log('Loading dismissed!');
	}

	ngOnInit()
	{

	}
	ionViewDidEnter()
	{

	}
	  
  
  showHoraire(id)
  {
		this.presentLoading();
		console.log(id)
		this.affichageAller = this.arrets[0]["stopName"]
		this.affichageRetour = this.arrets[this.arrets.length-1]["stopName"]
		   this.apiService.getData(false,"horaireArret",{arret:id,ligne:this.idLigne}).subscribe(res=>
	  	
		   {
			//this.presentLoading();
				console.log(res)
			
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

			
			
			document.getElementById("horaires").style.display = "block"
			document.getElementById("ficheHoraireButton").style.display = "block"
			document.getElementById("listeArrets").style.display = "none"

			this.dismissLoading();
		},
		err =>{
			console.log(err)
			alert("Impossible de récupérer les horaires. vérifiez votre connection internet et réessayez")
		})
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
}
