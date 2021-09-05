import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerPaymentTerm } from '../models/customer-payment-term';

@Injectable({
  providedIn: 'root'
})
export class CustomerPaymentTermService {

  private endpointCustomerPaymentTerm: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerPaymentTerm = this.endPoints.getApiCustomerPaymentTerm;
  }

  getCustomerPaymentTerms() {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerPaymentTerm);
    return this.http.get<CustomerPaymentTerm[]>(`${endpoint}/GetCustomerPaymentTerms`);
  }
}
