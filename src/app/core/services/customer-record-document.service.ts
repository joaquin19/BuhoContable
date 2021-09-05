import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerRecordDocument } from '../models/customer-record-document';

@Injectable({
  providedIn: 'root'
})
export class CustomerRecordDocumentService {

  private endpointCustomerRecordDocument: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerRecordDocument = this.endPoints.getApiCustomerRecordDocument;
  }

  getCustomerRecordDocumentsByRecordId(recordId) {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerRecordDocument);
    return this.http.get<CustomerRecordDocument[]>(`${endpoint}/GetCustomerRecordDocumentsByRecordId?recordId=${recordId}`);
  }
}
