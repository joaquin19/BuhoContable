import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { AccountBank } from '../models/account-bank';

@Injectable({
  providedIn: 'root'
})
export class AccountBankService {

  private endpointAccountBank: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointAccountBank = this.endPoints.getApiAccountBank;
  }

  getAccountBanks() {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBank);
    return this.http.get<AccountBank[]>(`${endpoint}/getAccountBanks`);
  }

  getAccountBankById(accountBankId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBank);
    return this.http.get<AccountBank>(`${endpoint}/getAccountBankById?accountBankId=${accountBankId}`);
  }

  getAccountBankBalanceById(accountBankId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBank);
    return this.http.get<AccountBank>(`${endpoint}/getAccountBankBalanceById?accountBankId=${accountBankId}`);
  }

  saveAccountBank(accountBankSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBank);
    return this.http.post<AccountBank>(`${endpoint}/saveAccountBank`, accountBankSave);
  }

  updateAccountBank(accountBankSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBank);
    return this.http.post<AccountBank>(`${endpoint}/updateAccountBank`, accountBankSave);
  }

  updateAccountBankInactive(accountBankId, createBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointAccountBank);
    return this.http.delete<AccountBank>(`${endpoint}/updateAccountBankInactive?accountBankId=${accountBankId}&createBy=${createBy}`);
  }

}
