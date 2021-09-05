import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { ReconciliationPurchaseOrderDetail } from '../models/reconciliation-purchase-order-detail';

@Injectable({
  providedIn: 'root'
})
export class ReconciliationPurchaseOrderDetailService {

  private endpointReconciliationPurchaseOrderDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointReconciliationPurchaseOrderDetail = this.endPoints.getApiReconciliationPurchaseOrderDetail;
  }

  getReconciliationPurchaseOrderDetailByHeaderId(reconciliationHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointReconciliationPurchaseOrderDetail);
    return this.http.get<ReconciliationPurchaseOrderDetail[]>(`${endpoint}/getReconciliationPurchaseOrderDetailByHeaderId?reconciliationHeaderId=${reconciliationHeaderId}`);
  }

  deleteReconciliationDetailByPurchaseOrderDetail(purchaseOrderDetailId, reconciliationId, createBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointReconciliationPurchaseOrderDetail);
    return this.http.delete<ReconciliationPurchaseOrderDetail>(`${endpoint}/deleteReconciliationDetailByPurchaseOrderDetail?purchaseOrderDetailId=${purchaseOrderDetailId}&reconciliationId=${reconciliationId}&createBy=${createBy}`);
  }
}