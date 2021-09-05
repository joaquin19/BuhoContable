import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { BalanceMovementHeader } from '../models/balance-movement-header';

@Injectable({
  providedIn: 'root'
})
export class BalanceMovementHeaderService {

  private endpointBalanceMovementHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointBalanceMovementHeader = this.endPoints.getApiBalanceMovementHeader;
  }

  getBalanceMovements() {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.get<BalanceMovementHeader[]>(`${endpoint}/getBalanceMovements`);
  }

  getBalanceMovementById(balanceMovementId) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.get<BalanceMovementHeader[]>(`${endpoint}/getBalanceMovementById?balanceMovementId=${balanceMovementId}`);
  }

  getBalanceMovementByIdAccountBankId(balanceMovementId, accountBankId) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.get<BalanceMovementHeader[]>(`${endpoint}/getBalanceMovementByIdAccountBankId?balanceMovementId=${balanceMovementId}&accountBankId=${accountBankId}`);
  }

  getBalanceMovementByAccountBankId(accountBankId) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.get<BalanceMovementHeader[]>(`${endpoint}/getBalanceMovementByAccountBankId?accountBankId=${accountBankId}`);
  }

  getBalanceMovementByAccountBankLastMovement(accountBankId) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.get<BalanceMovementHeader[]>(`${endpoint}/getBalanceMovementByAccountBankLastMovement?accountBankId=${accountBankId}`);
  }

  saveBalanceMovement(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.post<BalanceMovementHeader>(`${endpoint}/saveBalanceMovement`, form);
  }

  updateBalanceMovement(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.post<BalanceMovementHeader[]>(`${endpoint}/updateBalanceMovement`, form);
  }

  deleteBalanceMovement(balanceMovementId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointBalanceMovementHeader);
    return this.http.delete<BalanceMovementHeader>(`${endpoint}/deleteBalanceMovement?balanceMovementId=${balanceMovementId}&deleteBy=${deleteBy}`);
  }

}