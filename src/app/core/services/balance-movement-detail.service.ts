import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { BalanceMovementDetail } from '../models/balance-movement-detail';

@Injectable({
  providedIn: 'root'
})
export class BalanceMovementDetailService {

  private endpointBalanceMovementDetail: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointBalanceMovementDetail = this.endPoints.getApiBalanceMovementDetail;
  }

  getBalanceMovementDetailById(balanceMovementId) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementDetail);
    return this.http.get<BalanceMovementDetail[]>(`${endpoint}/getBalanceMovementDetailById?balanceMovementId=${balanceMovementId}`);
  }

  getBalanceMovementDetailByHeaderId(balanceMovementHeaderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementDetail);
    return this.http.get<BalanceMovementDetail[]>(`${endpoint}/getBalanceMovementDetailByHeaderId?balanceMovementHeaderId=${balanceMovementHeaderId}`);
  }

  updateBalanceMovementDetail(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementDetail);
    return this.http.post<BalanceMovementDetail[]>(`${endpoint}/updateBalanceMovementDetail`, form);
  }

  deleteBalanceMovementDetail(balanceMovementId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementDetail);
    return this.http.delete<BalanceMovementDetail>(`${endpoint}/deleteBalanceMovementDetail?balanceMovementId=${balanceMovementId}&deleteBy=${deleteBy}`);
  }

}