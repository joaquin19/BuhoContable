import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { MerchandiseReceptionHeader } from '../models/merchandise-reception-header';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseReceptionHeaderService {

  private endpointMerchandiseReceptionHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointMerchandiseReceptionHeader = this.endPoints.getApiMerchandiseReceptionHeader;
  }

  getMerchandiseReceptions() {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionHeader);
    return this.http.get<MerchandiseReceptionHeader[]>(`${endpoint}/getMerchandiseReceptions`);
  }

  getMerchandiseReceptionByPurchaseOrderId(purchaseOrderHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionHeader);
    return this.http.get<MerchandiseReceptionHeader[]>(`${endpoint}/getMerchandiseReceptionByPurchaseOrderId?purchaseOrderHeaderId=${purchaseOrderHeaderId}`);
  }

  getPurchaseOrderByFolio(folio) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionHeader);
    return this.http.get<MerchandiseReceptionHeader[]>(`${endpoint}/getPurchaseOrderByFolio?folio=${folio}`);
  }

  saveMerchandiseReception(merchandiseReceptionSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionHeader);
    return this.http.post<MerchandiseReceptionHeader>(`${endpoint}/saveMerchandiseReception`, merchandiseReceptionSave);
  }

}