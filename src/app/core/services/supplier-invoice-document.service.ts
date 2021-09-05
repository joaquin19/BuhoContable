
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierInvoiceDocument } from '../models/supplier-invoice-document';

@Injectable({
  providedIn: 'root'
})
export class SupplierInvoiceDocumentService {

  private endpointSupplierInvoiceDocument: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierInvoiceDocument = this.endPoints.getApiSupplierInvoiceDocument;
  }

  getSupplierInvoiceDocumentById(supplierInvoiceDocumentId, supplierInvoiceHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDocument);
    return this.http.get<SupplierInvoiceDocument>(`${endpoint}/getSupplierInvoiceDocumentById?supplierInvoiceDocumentId=${supplierInvoiceDocumentId}&supplierInvoiceHeaderId=${supplierInvoiceHeaderId}`);
  }

  getSupplierInvoiceDocumentsByHeaderId(supplierInvoiceId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDocument);
    return this.http.get<SupplierInvoiceDocument>(`${endpoint}/getSupplierInvoiceDocumentsByHeaderId?supplierInvoiceId=${supplierInvoiceId}`);

  }

  downloadSupplierInvoiceDocument(supplierInvoiceSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDocument);
    return this.http.post<Blob[]>(`${endpoint}/downloadSupplierInvoiceDocument`, supplierInvoiceSave, { responseType: 'blob' as 'json' });
  }

}
