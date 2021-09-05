import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { RequisitionType } from '../models/requisition-type';


@Injectable({
  providedIn: 'root'
})
export class RequisitionTypeService {

  private endpointRequisitionType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointRequisitionType = this.endPoints.getApiRequisitionType;
  }

  getRequisitionTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionType);
    return this.http.get<RequisitionType[]>(`${endpoint}/getRequisitionTypes`);
  }

}
