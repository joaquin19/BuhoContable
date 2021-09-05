
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierInvoiceHeader } from '../models/supplier-invoice-header';

@Injectable({
  providedIn: 'root'
})
export class SupplierInvoiceHeaderService {

  private endpointSupplierInvoiceHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierInvoiceHeader = this.endPoints.getApiSupplierInvoiceHeader;
  }

  getSupplierInvoiceHeaders() {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceHeader);
    return this.http.get<SupplierInvoiceHeader[]>(`${endpoint}/getSuppliers`);
  }

  getSupplierInvoiceHeaderById(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceHeader);
    return this.http.get<SupplierInvoiceHeader>(`${endpoint}/getSupplierById?supplierId=${supplierId}`);
  }

  saveSupplierInvoiceHeader(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceHeader);
    return this.http.post<SupplierInvoiceHeader>(`${endpoint}/saveSupplier`, form);
  }

  saveSupplierInvoiceDocument(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceHeader);
    return this.http.post<SupplierInvoiceHeader>(`${endpoint}/saveSupplierInvoiceDocument`, form);
  }

}
