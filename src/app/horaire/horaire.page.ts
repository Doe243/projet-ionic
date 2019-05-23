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
		this.router.navigate(["/horaire2",{id:this.idLigne,station:id}])
	}
	

	
}
