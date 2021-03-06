import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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

  loading

  recherche
  constructor
	(
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private apiService : ApiService
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

    if(temps.getMinutes() < 10)
    {
      tempsEcrit = tempsEcrit+"0"+temps.getMinutes()
    }
    else
    {
      tempsEcrit = tempsEcrit+temps.getMinutes()
    }
    this.time = tempsEcrit

    var dateEcrit
    if (temps.getMonth() < 10)
    {
      dateEcrit = temps.getFullYear()+"-0"+(temps.getMonth()+1)+"-"
    }
    else
    {
      dateEcrit = temps.getFullYear()+"-"+(temps.getMonth()+1)+"-"
    }

    if(temps.getDate() < 10)
    {
      dateEcrit = dateEcrit+"0"+temps.getDate()
    }
    else
    {
      dateEcrit = dateEcrit+temps.getDate()
    }
    this.date = dateEcrit
	}

  ngOnInit() {  
  }

  ionViewDidEnter()
  {
      
  }

  chercheDepart()
  {
    this.presentLoading()  
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
        this.dismissLoading()
      })
  }

  modeWalk(val)
  {
    if (val == 'WALK')
    {
      return true
    }
    else return false
  }


   modeBus(val)
  {
    if (val == 'BUS')
    {
      return true
    }
    else return false
  }

  modeTram(val)
  {
    if (val == 'TRAM')
    {
      return true
    }
    else return false
  }

  convertTimeStamp(timestamp)
  {
    var h = new Date(timestamp).getHours()
    var m = new Date(timestamp).getMinutes();
    var mToString
    if(m <10)
    {
      mToString = "0" + m
    }
    else{
      mToString = m
    }
    return h + ":" + mToString
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

  async presentLoading() 
  {
		this.loading = await this.loadingController.create({
		  spinner: null,
		  duration: 10000,
		  message: 'Veuillez patienter svp...',
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});

    console.log('Loading present');
    
    this.loading.onDidDismiss().then(res => 
      {
        console.log("Dégage!!!");

        if(!this.resultat)
        { 
          alert("Nous n'avons pu récupérer les données.\nVeuillez verifier l'orthographe de vos recherches.\nSi le probleme persiste, veuillez vérifier votre connexion internet");

        }
      });

    return await this.loading.present();
    }
    

  async dismissLoading() 
  {
		
		await this.loading.dismiss();
	
		console.log('Loading dismissed!');
  }
}
