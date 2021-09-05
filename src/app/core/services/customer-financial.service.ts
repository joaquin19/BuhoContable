import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerFinancial } from '../models/customer-financial';

@Injectable({
  providedIn: 'root'
})
export class CustomerFinancialService {

  private endpointCustomerFinancial: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerFinancial = this.endPoints.getApiCustomerFinancial;
  }

  getCustomerFinancialsByCustomerId(customerId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerFinancial);
    return this.http.get<CustomerFinancial>(`${endpoint}/GetCustomerFinancialsByCustomerId?customerId=${customerId}`);
  }
}
