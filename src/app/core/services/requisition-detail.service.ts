import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { RequisitionDetail } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class RequisitionDetailService {

  private endpointRequisitionDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointRequisitionDetail = this.endPoints.getApiRequisitionDetail;
  }

  getRequisitionDetailByHeaderId(requisitionHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionDetail);
    return this.http.get<RequisitionDetail>(`${endpoint}/getRequisitionDetailByHeaderId?requisitionHeaderId=${requisitionHeaderId}`);
  }

}
