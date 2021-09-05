import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Currency } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private endpointCurrency: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCurrency = this.endPoints.getApiCurrency;
  }

  getCurrencies() {
    const endpoint = this.settings.generateEndpoint(this.endpointCurrency);
    return this.http.get<Currency[]>(`${endpoint}/getCurrencies`);
  }

}
