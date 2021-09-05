import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerContact } from '../models/customer-contact';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactService {

  private endpointCustomerContact: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerContact = this.endPoints.getApiCustomerContact;
  }

  getCustomerContactsByCustomerId(customerId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerContact);
    return this.http.get<CustomerContact[]>(`${endpoint}/GetCustomerContactsByCustomerId?customerId=${customerId}`);
  }
}
