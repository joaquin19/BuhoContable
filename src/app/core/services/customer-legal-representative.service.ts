import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerLegalRepresentative } from '../models/customer-legal-representative';

@Injectable({
  providedIn: 'root'
})
export class CustomerLegalRepresentativeService {

  private endpointCustomerLegalRepresentative: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerLegalRepresentative = this.endPoints.getApiCustomerLegalRepresentative;
  }

  getCustomerLegalRepresentativeByCustomerId(customerId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerLegalRepresentative);
    return this.http.get<CustomerLegalRepresentative>(`${endpoint}/GetCustomerLegalRepresentativeByCustomerId?customerId=${customerId}`);
  }

}
