import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';
import { element } from '@angular/core/src/render3';

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
		this.affichageAller = this.arrets[0]["stopName"]
		this.affichageRetour = this.arrets[this.arrets.length-1]["stopName"]
    this.apiService.getData(false,"horaireArret",{arret:id,ligne:this.idLigne}).subscribe(res=>{
			console.log(res)
			this.horaireAller =  res[0]["times"]

			this.horaireRetour = res[1]["times"]
			
			document.getElementById("horaires").style.display = "block"
			document.getElementById("listeArrets").style.display = "none"
    })
	}
	
	lectureHoraire(depart, serviceDay)
	{
		var secondes = depart + serviceDay - Math.round(Date.now()/1000)
		var minutes = Math.round(secondes/60)
		return minutes + "min"
	}
}
