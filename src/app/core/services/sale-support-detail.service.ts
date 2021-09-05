import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SaleSupportDetail } from '../models/sale-support-detail';

@Injectable({
  providedIn: 'root'
})
export class SaleSupportDetailService {

  private endpointSaleSupportDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSaleSupportDetail = this.endPoints.getApiSaleSupportDetail;
  }

  getSaleSupportDetailByHeaderId(saleSupportId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportDetail);
    return this.http.get<SaleSupportDetail[]>(`${endpoint}/getSaleSupportDetailByHeaderId?saleSupportId=${saleSupportId}`);
  }

}