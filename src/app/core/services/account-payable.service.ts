import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { AccountPayable } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class AccountPayableService {

  private endpointAccountPayable: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointAccountPayable = this.endPoints.getApiAccountPayable;
  }

  getAuthorizedPurchaseOrders(createBy, authorizationStatusId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountPayable);
    return this.http.get<AccountPayable[]>(`${endpoint}/getAuthorizedPurchaseOrders?&createBy=${createBy}&authorizationStatusId=${authorizationStatusId}`);
  }

  updateAccountPayable(accountPayableSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountPayable);
    return this.http.put<AccountPayable>(`${endpoint}/updateAccountPayable`, accountPayableSave);
  }

}
