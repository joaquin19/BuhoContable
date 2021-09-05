import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Plant } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private endpointPlant: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPlant = this.endPoints.getApiPlant;
  }

  getPlants() {
    const endpoint = this.settings.generateEndpoint(this.endpointPlant);
    return this.http.get<Plant[]>(`${endpoint}/getPlants`);
  }

}
