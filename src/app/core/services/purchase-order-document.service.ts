import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { PurchaseOrderDocument } from '../models/purchase-order-document';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDocumentService {

  private PurchaseOrderDocument: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.PurchaseOrderDocument = this.endPoints.getApiPurchaseOrderDocument;
  }

  getPurchaseOrderDocumentsByHeaderId(purchaseOrderId) {
    const endpoint = this.settings.generateEndpoint(this.PurchaseOrderDocument);
    return this.http.get<PurchaseOrderDocument[]>(`${endpoint}/getPurchaseOrderDocumentsByHeaderId?purchaseOrderId=${purchaseOrderId}`);
  }

  downloadPurchaseOrderDocument(purchaseOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.PurchaseOrderDocument);
    return this.http.post<Blob>(`${endpoint}/downloadPurchaseOrderDocument`, purchaseOrderSave, { responseType: 'blob' as 'json' });
  }

  deletePurchaseOrderDocument(purchaseOrderId, documentId, documentName, path, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.PurchaseOrderDocument);
    return this.http.delete<PurchaseOrderDocument[]>(`${endpoint}/deletePurchaseOrderDocument?purchaseOrderId=${purchaseOrderId}&documentId=${documentId}&documentName=${documentName}&path=${path}&deleteBy=${deleteBy}`);
  }

}