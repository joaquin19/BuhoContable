import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierPaymentTerm } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierPaymentTermService {

  private endpointSupplierPaymentTerm: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierPaymentTerm = this.endPoints.getApiSupplierPaymentTerm;
  }

  getSupplierPaymentTerms() {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierPaymentTerm);
    return this.http.get<SupplierPaymentTerm[]>(`${endpoint}/getSupplierPaymentTerms`);
  }


}
