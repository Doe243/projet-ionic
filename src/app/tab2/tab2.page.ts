import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { LineToLineMappedSource } from 'webpack-sources';
import { IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
@ViewChild(IonSegment) segment: IonSegment;
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
            
  constructor(private apiService : ApiService, private router: Router){}

  ngOnInit() {
    this.segment.value = "Tag";
    this.searchChange()
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
  }
  TakeHours(id){
    console.log("il marche");
    this.router.navigate(['horaires',{id:id}])
  }
  searchChange(){
    
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
    })
  }

}
