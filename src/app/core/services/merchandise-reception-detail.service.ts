import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { MerchandiseReceptionDetail } from '../models/merchandise-reception-detail';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseReceptionDetailService {

  private endpointMerchandiseReceptionDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointMerchandiseReceptionDetail = this.endPoints.getApiMerchandiseReceptionDetail;
  }

  getMerchandiseReceptionDetailByPOH(purchaseOrderHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDetail);
    return this.http.get<MerchandiseReceptionDetail[]>(`${endpoint}/getMerchandiseReceptionDetailByPOH?purchaseOrderHeaderId=${purchaseOrderHeaderId}`);
  }

  saveMerchandiseReceptionDetail(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDetail);
    return this.http.post<MerchandiseReceptionDetail>(`${endpoint}/saveMerchandiseReceptionDetail`, form);
  }

  deleteMerchandiseReceptionDetail(merchandiseReceptionId, merchandiseReceptionDetailId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDetail);
    return this.http.delete<MerchandiseReceptionDetail[]>(`${endpoint}/deleteMerchandiseReceptionDetail?merchandiseReceptionId=${merchandiseReceptionId}&merchandiseReceptionDetailId=${merchandiseReceptionDetailId}&deleteBy=${deleteBy}`);
  }

}