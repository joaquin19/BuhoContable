import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerDocumentType } from '../models/customer-document-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerDocumentTypeService {

  private endpointCustomerDocumentType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerDocumentType = this.endPoints.getApiCustomerDocumentType;
  }

  getCustomerDocumentTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerDocumentType);
    return this.http.get<CustomerDocumentType[]>(`${endpoint}/GetCustomerDocumentTypes`);
  }
}
