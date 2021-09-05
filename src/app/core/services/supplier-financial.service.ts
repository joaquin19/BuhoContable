import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierFinancial } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierFinancialService {

  private endpointSupplierFinancial: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierFinancial = this.endPoints.getApiSupplierFinancial;
  }

  getSupplierFinancialsBySupplierId(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierFinancial);
    return this.http.get<SupplierFinancial>(`${endpoint}/getSupplierFinancialsBySupplierId?supplierId=${supplierId}`);
  }

}
