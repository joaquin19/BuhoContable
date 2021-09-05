
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { CostType } from '../models/cost-type';


@Injectable({
  providedIn: 'root'
})
export class CostTypeService {

  private endpointCostType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCostType = this.endPoints.getApiCostType;
  }

  getCostTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointCostType);
    return this.http.get<CostType[]>(`${endpoint}/getCostTypes`);
  }

}
