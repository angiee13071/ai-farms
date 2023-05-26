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
    setTimeout(() => {
      this._map.addMap(4.60971, -74.08175, 'map-none');
    });

    this._sharedService.typeLocationChange.subscribe(() => {
      if (this._sharedService.typeLocation === 'maps') {
        setTimeout(() => {
          this._map.addMap(4.60971, -74.08175, 'map-maps');
          console.log("se cargó el document");
        });
      }
    });
  }



}



