import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { UnitMeasure } from '../models/unit-measure';

@Injectable({
  providedIn: 'root'
})
export class UnitMeasureService {

  private endpointUnitMeasure: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointUnitMeasure = this.endPoints.getApiUnitMeasure;
  }

  getUnitsMeasure() {
    const endpoint = this.settings.generateEndpoint(this.endpointUnitMeasure);
    return this.http.get<UnitMeasure[]>(`${endpoint}/getUnitsMeasure`);
  }
}
