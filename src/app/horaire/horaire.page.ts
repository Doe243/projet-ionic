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
<<<<<<< HEAD
	horaireAller
	horaireRetour
	affichageAller: string
	affichageRetour: string
	idArrete
	information
<<<<<<< HEAD
	nameArr:String
=======
	loading
>>>>>>> master
=======
>>>>>>> parent of ad46245... avance 3 favorites

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService,
		public loadingController: LoadingController,
		
	)
	{
		
		this.route.params.subscribe(param =>{
			this.idLigne = param.id
			this.presentLoading()
			this.apiService.getData(false,"ficheHoraire",this.idLigne).subscribe(res =>{				
        		console.log(res[0])
				this.arrets = res[0]["arrets"]
				this.dismissLoading()      
			},err =>{
				alert("Impossible de récupérer la ligne. vérifiez votre connection internet et réessayez")
				console.log(err)
				this.dismissLoading()
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
<<<<<<< HEAD
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
=======
		this.router.navigate(["/horaire2",{id:this.idLigne,station:id}])
>>>>>>> master
	}
	

<<<<<<< HEAD
	ficheHoraire()
	{
		
		document.getElementById("ficheHoraireButton").style.display = "none"
		document.getElementById("horaires").style.display = "none"
		document.getElementById("listeArrets").style.display = "block"
	}
	AddFavorites(idArret){
		this.information = {idArret: idArret,idLine: this.idLigne}
		this.apiService.setLocalData(idArret,this.information)
		console.log("el marche22",this.information)
	}
=======
	
>>>>>>> master
}
