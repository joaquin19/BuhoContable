import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SaleSupportDetailTax } from '../models/sale-support-detail-tax';

@Injectable({
  providedIn: 'root'
})
export class SaleSupportDetailTaxService {

  private endpointSaleSupportDetailTax: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSaleSupportDetailTax = this.endPoints.getApiSaleSupportDetailTax;
  }

  getSaleSupportDetailTaxByDetailId(saleSupportDetailId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportDetailTax);
    return this.http.get<SaleSupportDetailTax[]>(`${endpoint}/getSaleSupportDetailTaxByDetailId?saleSupportDetailId=${saleSupportDetailId}`);
  }

}