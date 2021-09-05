
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { BusinessUnit } from '../models/business-unit';


@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  private endpointBusinessUnit: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointBusinessUnit = this.endPoints.getApiBusinessUnit;
  }

  getBusinessUnits() {
    const endpoint = this.settings.generateEndpoint(this.endpointBusinessUnit);
    return this.http.get<BusinessUnit[]>(`${endpoint}/getBusinessUnits`);
  }

}
