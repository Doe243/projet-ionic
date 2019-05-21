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
	
	idLigne
  arrets
  horaire

	constructor(
		private router:Router, 
		private route: ActivatedRoute,
		private apiService: ApiService
	)
	{
		this.route.params.subscribe(param =>{
			this.idLigne = param.id
			
			this.apiService.getData(false,"ficheHoraire",this.idLigne).subscribe(res =>{
        console.log(res[0])
        this.arrets = res[0]["arrets"]
        
			})
		})
	}

	ngOnInit()
	{

	}
	ionViewDidEnter()
	{

  }
  
  showHoraire(id)
  {
    console.log(id)
    this.apiService.getData(false,"horaireArret",{arret:id,ligne:this.idLigne}).subscribe(res=>{
      console.log(res)
    })
  }
}
