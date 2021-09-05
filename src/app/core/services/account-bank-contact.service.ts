import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { AccountBankContact } from '@app/core/models/account-bank-contact';

@Injectable({
  providedIn: 'root'
})
export class AccountBankContactService {

  private endpointAccountBankContact: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointAccountBankContact = this.endPoints.getApiAccountBankContact;
  }

  getAccountBankContactsByAccountBankId(accountBankId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBankContact);
    return this.http.get<AccountBankContact[]>(`${endpoint}/getAccountBankContactsByAccountBankId?accountBankId=${accountBankId}`);
  }

}