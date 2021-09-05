import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerRecord } from '../models/customer-record';

@Injectable({
  providedIn: 'root'
})
export class CustomerRecordService {

  private endpointCustomerRecord: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerRecord = this.endPoints.getApiCustomerRecord;
  }

  getCustomerRecordByCustomerId(customerId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerRecord);
    return this.http.get<CustomerRecord>(`${endpoint}/GetCustomerRecordByCustomerId?customerId=${customerId}`);
  }
}
