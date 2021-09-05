import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '@app/core/constants';
import { PriceDetail } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class PriceDetailService {

  private endpointPriceDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPriceDetail = this.endPoints.getApiPriceDetail;
  }

  getPriceDetailByHeaderId(priceHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceDetail);
    return this.http.get<PriceDetail[]>(`${endpoint}/GetPriceDetailByHeaderId?priceHeaderId=${priceHeaderId}`);
  }

}
