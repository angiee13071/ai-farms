import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { MapService } from '../../../services/map.service'
@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

  constructor(public _sharedService: SharedService, public _map: MapService) {

  }

  ngOnInit() {
    this._map.addMap(4.60971, -74.08175);
    // this._sharedService.typeLocationChange.subscribe(() => {
    //   console.log(this._sharedService.typeLocation);
    //   if (this._sharedService.typeLocation === 'none' || this._sharedService.typeLocation === 'maps') {
    //     this._map.addMap(4.60971, -74.08175);

    //   }
    // });



  }



}



