import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '@app/core/constants';
import { OrderDetail } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private endpointOrderDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointOrderDetail = this.endPoints.getApiOrderDetail;
  }

  getOrderDetailByHeaderId(orderHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointOrderDetail);
    return this.http.get<OrderDetail[]>(`${endpoint}/GetOrderDetailByHeaderId?orderHeaderId=${orderHeaderId}`);
  }

}
