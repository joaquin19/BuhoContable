
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierInvoiceDetail } from '../models/supplier-invoice-detail';

@Injectable({
  providedIn: 'root'
})
export class SupplierInvoiceDetailService {

  private endpointSupplierInvoiceDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierInvoiceDetail = this.endPoints.getApiSupplierInvoiceDetail;
  }

  getSupplierInvoiceDetails() {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDetail);
    return this.http.get<SupplierInvoiceDetail[]>(`${endpoint}/getSuppliers`);
  }

  getSupplierInvoiceDetailById(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDetail);
    return this.http.get<SupplierInvoiceDetail>(`${endpoint}/getSupplierById?supplierId=${supplierId}`);
  }

  getSupplierInvoiceDetailByReconciliationId(reconciliationId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDetail);
    return this.http.get<SupplierInvoiceDetail>(`${endpoint}/getSupplierInvoiceDetailByReconciliationId?reconciliationId=${reconciliationId}`);
  }

  saveSupplierInvoiceDetail(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierInvoiceDetail);
    return this.http.post<SupplierInvoiceDetail>(`${endpoint}/saveSupplier`, form);
  }

}
