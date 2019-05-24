import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itineraire',
  templateUrl: 'itineraire.page.html',
  styleUrls: ['itineraire.page.scss']
})
export class ItinerairePage implements OnInit {
  arretDepart: string
  arretArriver: string
  time: string
  date: string

  coordones1LA;
  coordones1LO;
  coordones2LA;
  coordones2LO;

  resultat

  recherche
  constructor
	(
    private apiService : ApiService,
    private route: ActivatedRoute
	) 
	{ 
    this.route.params.subscribe(param =>{
      if(param.station )
      {
        this.arretDepart = param.station
      }
    })
    var temps = new Date
    var tempsEcrit
    if (temps.getHours() < 10)
    {
      tempsEcrit = "0"+temps.getHours()+":"
    }
    else
    {
      tempsEcrit = temps.getHours()+":"
    }

	}

  ngOnInit() {  
  }

  ionViewDidEnter()
  {
      
  }

  chercheDepart()
  {
      this.apiService.getData(false, "itineraire", this.arretDepart).subscribe(res =>{
        console.log("tout",res)
        res.forEach(element => {
          this.coordones1LA = element.geometry.coordinates[0]
          this.coordones1LO = element.geometry.coordinates[1]
        });
        this.ChercheArriver()
      })
      
  }
  ChercheArriver(){
    this.apiService.getData(false, "itineraire", this.arretArriver).subscribe(res =>{
      console.log("tout",res)
      res.forEach(element => {
        this.coordones2LA = element.geometry.coordinates[0]
        this.coordones2LO = element.geometry.coordinates[1]
        
      });
      this.chercheItineraire()
    })
  }

  chercheItineraire(){
    this.apiService.getData(false,"rechercheItineraire",{lngD:this.coordones1LO,latD:this.coordones1LA,
      lngA:this.coordones2LO,latA:this.coordones2LA,time:this.time,date:this.date}).subscribe(res =>{
        console.log("chemin",res);
        this.resultat = res["plan"]["itineraries"]
      })
  }

  convertTimeStamp(timestamp)
  {
    var h = new Date(timestamp).getHours()
    var m = new Date(timestamp).getMinutes();
    var mToString
    if(m <10)
    {
      mToString = "0"+m
    }
    else{
      mToString = m
    }
    return h+":"+mToString
  }

  convertToMinutes(minutes)
  {
    return Math.round(minutes/60)
  }

  listeRechercheDepart(val)
  {
    if (val.length > 2)
    {
      document.getElementById("rechercheDepart").style.display = "block"
      this.apiService.getData(false,"listLieu",val).subscribe(res =>{
        this.recherche = res["features"]
      })
    }
    else
    {
      this.recherche = []
      document.getElementById("rechercheDepart").style.display = "none"
    }
  }

  setRechercheDepart(val)
  {
    this.arretDepart = val
    document.getElementById("rechercheDepart").style.display = "none"
  }
  listeRechercheArrivee(val: string)
  {
    
    if (val.length > 2)
    {
      document.getElementById("rechercheArrivee").style.display = "block"
      this.apiService.getData(false,"listLieu",val).subscribe(res =>{
        this.recherche = res["features"]
      })
    }
    else
    {
      this.recherche = []
      document.getElementById("rechercheArrivee").style.display = "none"
    }
    
  }

  setRechercheArrivee(val)
  {
    this.arretArriver = val
    document.getElementById("rechercheArrivee").style.display = "none"
  }

  closeEverything()
  {
    document.getElementById("rechercheDepart").style.display = "none"
    document.getElementById("rechercheArrivee").style.display = "none"
  }

  ionViewDidLeave()
  {
    this.closeEverything()
  }
}
