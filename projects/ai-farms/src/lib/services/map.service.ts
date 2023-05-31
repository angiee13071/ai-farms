import { Injectable } from '@angular/core';
/// <reference path="<relevant path>/node_modules/@types/googlemaps/index.d.ts" />
import { } from 'googlemaps';
declare const google: any;
@Injectable()
export class MapService {

    constructor() { }

    addMap(latitude: number, longitude: number, elementId: string) {

        const mapElement = document.getElementById(elementId);
        if (!mapElement) {
            console.error('Element with ID "map" not found');
            return;
        }
        // console.log(latitude, longitude, document)
        // window.addEventListener('load', () => {
        const map = new google.maps.Map(mapElement, {
            center: { lat: latitude, lng: longitude },
            // zoom: 15,
            zoom: 10,
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
        // console.log(map)
        const marker = new google.maps.Marker({
            position: { lat: 4.648625, lng: -74.062404 },
            map: map, title: 'Tú ubicación', draggable: true
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
        map.addListener('click', (event: { latLng: any; }) => {
            const clickedLocation = event.latLng;
            marker.setPosition(clickedLocation);
        });
        //  });
    }
}
