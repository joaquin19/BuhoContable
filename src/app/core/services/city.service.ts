import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { City } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private endpointCity: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCity = this.endPoints.getApiCity;
  }

  getCities(stateId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCity);
    return this.http.get<City[]>(`${endpoint}/getCities?stateId=${stateId}`);
  }


}
