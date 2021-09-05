import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { PurchaseOrderDetailTax } from '../models/purchase-order-detail-tax';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailTaxService {

  private endpointPurchaseOrderDetailTax: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPurchaseOrderDetailTax = this.endPoints.getApiPurchaseOrderDetailTax;
  }

  GetPurchaseOrderDetailTaxByPOH(purchaseOrderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetailTax);
    return this.http.get<PurchaseOrderDetailTax[]>(`${endpoint}/GetPurchaseOrderDetailTaxByPOH?purchaseOrderId=${purchaseOrderId}`);
  }

  GetPurchaseOrderDetailTaxByPOD(purchaseOrderDetailId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetailTax);
    return this.http.get<PurchaseOrderDetailTax[]>(`${endpoint}/GetPurchaseOrderDetailTaxByPOD?purchaseOrderDetailId=${purchaseOrderDetailId}`);
  }
}
