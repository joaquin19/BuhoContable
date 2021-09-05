import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierContact } from '@app/core/models/supplier-contact';

@Injectable({
  providedIn: 'root'
})
export class SupplierContactService {

  private endpointSupplierContact: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierContact = this.endPoints.getApiSupplierContact;
  }

  getSupplierContactsBySupplierId(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierContact);
    return this.http.get<SupplierContact[]>(`${endpoint}/getSupplierContactsBySupplierId?supplierId=${supplierId}`);
  }

}
