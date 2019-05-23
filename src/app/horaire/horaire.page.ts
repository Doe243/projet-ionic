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
    arrets
	horaireAller
	horaireRetour
	affichageAller: string
	affichageRetour: string
	idArrete
	information
	loading

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService,
		public loadingController: LoadingController,
		
	)
	{
		
		this.route.params.subscribe(param =>{
			this.idLigne = param.id
			
			this.apiService.getData(false,"ficheHoraire",this.idLigne).subscribe(res =>{				
        		console.log(res[0])
				this.arrets = res[0]["arrets"]   
				if (param.arret)
				{
					console.log(param.arret)
				}     
			},err =>{
				alert("Impossible de récupérer la ligne. vérifiez votre connection internet et réessayez")
				console.log(err)
			})
		})
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
		this.idArrete = id
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
			console.log("3")
			document.getElementById("listHoraires").style.display = "block"
			document.getElementById("ficheHoraireButton").style.display = "block"
			document.getElementById("listeArretsHoraires").style.display = "none"
			console.log("4")
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
		document.getElementById("listHoraires").style.display = "none"
		document.getElementById("listeArretsHoraires").style.display = "block"
	}
	AddFavorites(idArret){
		this.information = {idArret: idArret,idLine: this.idLigne}
		this.apiService.setLocalData(idArret,this.information)
		console.log("el marche22",this.information)
	}
}
