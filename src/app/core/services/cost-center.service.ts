import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { CostCenter } from '../models/cost-center';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  private endpointCostCenter: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCostCenter = this.endPoints.getApiCostCenter;
  }

  getCostCenters(businessUnitId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCostCenter);
    return this.http.get<CostCenter[]>(`${endpoint}/getCostCenters?businessUnitId=${businessUnitId}`);
  }


}
