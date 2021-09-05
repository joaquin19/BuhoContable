import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { PurchaseOrderType } from '../models/purchase-order-type';



@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderTypeService {

  private endpointPurchaseOrderType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPurchaseOrderType = this.endPoints.getApiPurchaseOrderType;
  }

  getPurchaseOrderTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderType);
    return this.http.get<PurchaseOrderType[]>(`${endpoint}/getPurchaseOrderTypes`);
  }

}
