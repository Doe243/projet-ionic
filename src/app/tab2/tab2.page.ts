import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  res:Observable<any>;

  constructor(private apiService : ApiService){}

  ngOnInit() {}
  
  searchChange(){
    this.apiService.getData(false,"horaires",null).subscribe(res=>{
      console.log(res)
    })
  }

}
