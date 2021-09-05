import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { PaymentType } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  private endpointPaymentType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPaymentType = this.endPoints.getApiPaymentType;
  }

  getPaymentTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointPaymentType);
    return this.http.get<PaymentType[]>(`${endpoint}/getPaymentTypes`);
  }

}
