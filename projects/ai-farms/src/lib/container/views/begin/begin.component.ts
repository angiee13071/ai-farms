import { Component, NgModule, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

  display: any;


  zoom = 12;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  center: google.maps.LatLngLiteral = {
    lat: 4.6097,
    lng: -74.0817
  };

  constructor(public _sharedService: SharedService) { }

  ngOnInit() { }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule
    // Otros módulos necesarios
  ],
})
export class BeginModule { }
