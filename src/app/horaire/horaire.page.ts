import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {
//dans la récupération de l'api:
	//faut faire "serviceDay"+"scheduledDeparture" pour avoir le timestamp
	
	id

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService
	)
	{
		this.route.params.subscribe(param =>{
			this.id = param.id
			
			this.apiService.getData(false,"ficheHoraire",this.id).subscribe(res =>{
				console.log(res)
			})
		})
	}

	ngOnInit()
	{

	}
	ionViewDidEnter()
	{

	}
}
