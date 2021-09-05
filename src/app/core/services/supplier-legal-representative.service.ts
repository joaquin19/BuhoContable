import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierLegalRepresentative } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierLegalRepresentativeService {

  private endpointSupplierLegalRepresentative: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierLegalRepresentative = this.endPoints.getApiSupplierLegalRepresentative;
  }

  getSupplierLegalRepresentativeBySupplierId(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierLegalRepresentative);
    return this.http.get<SupplierLegalRepresentative>(`${endpoint}/getSupplierLegalRepresentativeBySupplierId?supplierId=${supplierId}`);
  }

}
