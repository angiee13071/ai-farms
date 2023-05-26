import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
/// <reference path="<relevant path>/node_modules/@types/googlemaps/index.d.ts" />
import { } from 'googlemaps';
declare const google: any;
@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {
  private mapLoaded: boolean = false;
  constructor(public _sharedService: SharedService) {

  }

  ngOnInit() {
    this.loadMapScript().then(() => {
      this.mapLoaded = true;
      this._sharedService.typeLocationChange.subscribe(() => {
        console.log(this._sharedService.typeLocation);
        if (this._sharedService.typeLocation === 'none' || this._sharedService.typeLocation === 'maps') {
          this.addMap(4.60971, -74.08175);
        }
      });
      if (this.mapLoaded) {
        this.addMap(4.60971, -74.08175);
      }
    });

  }

  loadMapScript(): Promise<void> {
    return new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2nt7WTUh_f7rArhuYjgwYc0ohnAv2e7g`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  addMap(latitude: number, longitude: number) {
    //  window.addEventListener('load', () => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      // zoom: 15,
      zoom: 11,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      disableDefaultUI: true,
      styles: [
        // Ocultar landmarks (puntos de referencia)
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        // Ocultar puntos de interés (POIs)
        { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
        //vegetación
        {
          featureType: 'landscape', elementType: 'geometry',
          stylers: [{ hue: '#253E25' }, { saturation: -40 }, { lightness: -60 }]
        },
        //carreteras
        {
          featureType: 'road', elementType: 'geometry',
          stylers: [{ hue: '#253E25' }, { saturation: 0 }, { lightness: -40 }]
        },
        //caminos
        {
          featureType: 'road', elementType: 'geometry',
          stylers: [{ hue: '#DECC96' }, { saturation: -60 }, { lightness: 30 }]
        },
        //agua
        {
          featureType: 'water', elementType: 'geometry',
          stylers: [{ hue: '#4C609E' }, { saturation: -20 }, { lightness: -10 }]
        }
      ]
    });
    console.log(map)
    const marker = new google.maps.Marker({
      position: { lat: 4.648625, lng: -74.062404 },
      map: map, title: 'Tú ubicación', draggable: true
    });

    map.addListener('click', (event: { latLng: any; }) => {
      const clickedLocation = event.latLng;
      marker.setPosition(clickedLocation);
    });

    // });
  }
}



