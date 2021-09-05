import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierRecordDocument } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierRecordDocumentService {

  private endpointSupplierRecordDocument: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierRecordDocument = this.endPoints.getApiSupplierRecordDocument;
  }

  getSupplierRecordDocumentsByRecordId(recordId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierRecordDocument);
    return this.http.get<SupplierRecordDocument[]>(`${endpoint}/getSupplierRecordDocumentsByRecordId?recordId=${recordId}`);
  }

}
