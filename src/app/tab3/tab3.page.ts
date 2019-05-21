import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
	//dans la récupération de l'api:
	//faut faire "serviceDay"+"scheduledDeparture" pour avoir le timestamp
	
	code

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService
	)
	{
		this.route.params.subscribe(param =>{
			this.code = param.code
			this.apiService.getData(false,"ficheHoraire",this.code).subscribe(res =>{
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
