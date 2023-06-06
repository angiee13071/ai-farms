import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/// <reference path="<relevant path>/node_modules/@types/googlemaps/index.d.ts" />
import { } from 'googlemaps';
import { Observable, map } from 'rxjs';
declare const google: any;
@Injectable()
export class MapService {
    private geocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    private apiKey = 'AIzaSyA2nt7WTUh_f7rArhuYjgwYc0ohnAv2e7g';
    constructor(private _http: HttpClient) { }

    addMap(latitude: number, longitude: number, elementId: string) {

        const mapElement = document.getElementById(elementId);
        if (!mapElement) {
            console.error('Element with ID "map" not found');
            return;
        }

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
            position: { lat: latitude, lng: longitude },
            map: map, title: 'Tú ubicación', draggable: true
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
        map.addListener('click', (event: { latLng: any; }) => {
            const clickedLocation = event.latLng;
            marker.setPosition(clickedLocation);
        });
        //  });
    }
    getLocation(latitude: any, longitude: any): Observable<string> {
        return this._http.get(`${this.geocodeApiUrl}?latlng=${latitude},${longitude}&key=${this.apiKey}`)
            .pipe(
                map((response: any) => {
                    if (response.status === 'OK' && response.results.length > 0) {
                        const placeName = response.results[0].formatted_address;
                        return placeName;
                    }
                    throw new Error('No se encontró el nombre del lugar.');
                })
            );
    }
}
