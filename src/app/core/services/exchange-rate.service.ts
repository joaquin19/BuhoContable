import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { ExchangeRate } from '../models/exchange-rate';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private endpointExchangeRate: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointExchangeRate = this.endPoints.getApiExchangeRate;
  }

  getExchangeRates() {
    const endpoint = this.settings.generateEndpoint(this.endpointExchangeRate);
    return this.http.get<ExchangeRate[]>(`${endpoint}/getExchangeRates`);
  }

  getExchangeRateById(exchangeRateId) {
    const endpoint = this.settings.generateEndpoint(this.endpointExchangeRate);
    return this.http.get<ExchangeRate>(`${endpoint}/getExchangeRateById?ExchangeRateId=${exchangeRateId}`);
  }

  saveExchangeRate(exchangeRateSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointExchangeRate);
    return this.http.post<ExchangeRate>(`${endpoint}/saveExchangeRate`, exchangeRateSave);
  }

  updateExchangeRate(exchangeRateSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointExchangeRate);
    return this.http.put<ExchangeRate>(`${endpoint}/updateExchangeRate`, exchangeRateSave);
  }

  deleteExchangeRate(exchangeRateId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointExchangeRate);
    return this.http.delete<ExchangeRate>(`${endpoint}/deleteExchangeRate?exchangeRateId=${exchangeRateId}&deleteBy=${deleteBy}`);
  }

}
