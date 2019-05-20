import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  res:Observable<any>;
  private apiService: ApiService;
  constructor(){}
  searchChange(){
    this.res = this.apiService.getData(true,"horaires",5);
    console.log('my results',this.res);
  }

}
