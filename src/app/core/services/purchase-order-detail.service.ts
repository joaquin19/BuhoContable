import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { PurchaseOrderDetail } from '../models/purchase-order-detail';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailService {

  private endpointPurchaseOrderDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPurchaseOrderDetail = this.endPoints.getApiPurchaseOrderDetail;
  }

  getPurchaseOrdersDetail() {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.get<PurchaseOrderDetail[]>(`${endpoint}/getPurchaseOrdersDetail`);
  }

  getPurchaseOrderDetailById(purchaseOrderDetailId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.get<PurchaseOrderDetail>(`${endpoint}/getPurchaseOrderById?purchaseOrderDetailId=${purchaseOrderDetailId}`);
  }

  getPurchaseOrderDetailByHeaderId(purchaseOrderHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.get<PurchaseOrderDetail[]>(`${endpoint}/getPurchaseOrderDetailByHeaderId?purchaseOrderHeaderId=${purchaseOrderHeaderId}`);
  }

  getPurchaseOrderDetailByReconciliation(reconciliationId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.get<PurchaseOrderDetail[]>(`${endpoint}/getPurchaseOrdersDetailByReconciliation?reconciliationId=${reconciliationId}`);
  }

  savePurchaseOrderDetail(purchaseOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.post<PurchaseOrderDetail>(`${endpoint}/savePurchaseOrder`, purchaseOrderSave);
  }

  updatePurchaseOrderDetail(purchaseOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.post<PurchaseOrderDetail[]>(`${endpoint}/updatePurchaseOrder`, purchaseOrderSave);
  }

  deletePurchaseOrder(purchaseOrderId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderDetail);
    return this.http.delete<PurchaseOrderDetail>(`${endpoint}/deletePurchaseOrder?purchaseOrderId=${purchaseOrderId}&deleteBy=${deleteBy}`);
  }
}