import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private endpointCustomer: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomer = this.endPoints.getApiCustomer;
  }

  getCustomer() {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomer);
    return this.http.get<Customer[]>(`${endpoint}/GetCustomers`);
  }

  getCustomerById(customerId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomer);
    return this.http.get<Customer>(`${endpoint}/GetCustomerById?CustomerId=${customerId}`);
  }

  saveCustomer(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomer);
    return this.http.post<Customer>(`${endpoint}/SaveCustomer`, form);
  }

  updateCustomer(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomer);
    return this.http.post<Customer>(`${endpoint}/UpdateCustomer`, form);
  }
}
