import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { RequisitionDetailTax } from '../models/requisition-detail-tax';

@Injectable({
  providedIn: 'root'
})
export class RequisitionDetailTaxService {

  private endpointRequisitionDetailTax: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointRequisitionDetailTax = this.endPoints.getApiRequisitionDetailTax;
  }

  GetRequisitionDetailTaxByRH(requisitionId) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionDetailTax);
    return this.http.get<RequisitionDetailTax[]>(`${endpoint}/GetRequisitionDetailTaxByRH?requisitionId=${requisitionId}`);
  }

  GetRequisitionDetailTaxByRD(requisitionDetailId) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionDetailTax);
    return this.http.get<RequisitionDetailTax[]>(`${endpoint}/GetRequisitionDetailTaxByRD?requisitionDetailId=${requisitionDetailId}`);
  }
}
