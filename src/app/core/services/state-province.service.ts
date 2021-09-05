import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { StateProvince } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class StateProvinceService {

  private endpointStateProvince: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointStateProvince = this.endPoints.getApiStateProvince;
  }

  getStatesProvinces(countryId) {
    const endpoint = this.settings.generateEndpoint(this.endpointStateProvince);
    return this.http.get<StateProvince[]>(`${endpoint}/getStatesProvinces?countryId=${countryId}`);
  }


}
