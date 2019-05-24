import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { LineToLineMappedSource } from 'webpack-sources';
import { IonSegment, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  disp = "block";
  dispTrans = "none";

  loading

@ViewChild(IonSegment) segment: IonSegment;
lines: Observable<any>;
  public items: Array<{id:String, gtfsId:String, shortName:String, longName:String,
                  color:String, textColor:String, mode:String, type:String, res:String}> = [];
  public trams: Array<{id:String, gtfsId:String, shortName:String, longName:String,
    color:String, textColor:String, mode:String, type:String, res:String}> = [];
    public CHRONO: Array<{id:String, gtfsId:String, shortName:String, longName:String,
      color:String, textColor:String, mode:String, type:String, res:String}> = [];
      public PROXIMO: Array<{id:String, gtfsId:String, shortName:String, longName:String,
        color:String, textColor:String, mode:String, type:String, res:String}> = [];
        public FLEXO: Array<{id:String, gtfsId:String, shortName:String, longName:String,
          color:String, textColor:String, mode:String, type:String, res:String}> = [];
          public C38: Array<{id:String, gtfsId:String, shortName:String, longName:String,
            color:String, textColor:String, mode:String, type:String, res:String}> = [];
            
  constructor(private apiService : ApiService, 
    private router: Router,
    public loadingController: LoadingController,){}

  ngOnInit() {
    this.segment.value = "Tag";
    this.reseaux()
    this.segmentChanged("Tag")
  }
  segmentChanged(ev: any) {
    if(ev=="Tag" || ev.detail.value=="Tag"){
      //this.reseauTag()
      this.disp = "block"
      this.dispTrans = "none";
    }else{
      console.log(ev.detail.value)
      //this.reseauTransisere()
      this.disp = "none";
      this.dispTrans = "block";
    }
  }
  TakeHours(id,nameLin,color){
    console.log("il marche",id,nameLin,color);
    this.router.navigate(['horaire',{id:id,nameLine:nameLin,color:color}])
  }
  reseaux(){
    this.presentLoading()
    this.apiService.getData(false,"lines").subscribe(line=>{
      line.forEach(element => {
        this.items.push({
          id:element.id,
          gtfsId:element.gtfsId,
          shortName:element.shortName,
          longName:element.longName,
          color:element.color, 
          textColor:element.textColor, 
          mode:element.mode, 
          type:element.type,
          res:element.res
        });//end items.push
        
      });//end line.foreach
      this.items.forEach(line =>{
        if(line.type=="TRAM"){
          this.trams.push(line);//end items.push
        }
      })//end items.foreach
      this.items.forEach(line =>{
        if(line.type=="CHRONO"){
          this.CHRONO.push(line);//end items.push
        }
      })//end items.foreach
      this.items.forEach(line =>{
        if(line.type=="PROXIMO"){
          this.PROXIMO.push(line);//end items.push
        }
      })//end items.foreach
      this.items.forEach(line =>{
        if(line.type=="FLEXO"){
          this.FLEXO.push(line);//end items.push
        }
      })//end items.foreach
      this.items.forEach(line =>{
        if(line.type=="C38"){
          this.C38.push(line);//end items.push
        }
      })//end items.foreach
      this.dismissLoading()
    })

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

        if(this.items.length ==0)
        { 
          alert("Nous n'avons pu récupérer les données\nVeuillez vérifier votre connexion internet svp");

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
