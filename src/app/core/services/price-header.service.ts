import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '@app/core/constants';
import { PriceHeader } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class PriceHeaderService {

  private endpointPriceHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPriceHeader = this.endPoints.getApiPriceHeader;
  }

  getPrices(userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceHeader);
    return this.http.get<PriceHeader[]>(`${endpoint}/GetPrices?userName=${userName}`);
  }

  getPriceById(priceId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceHeader);
    return this.http.get<PriceHeader[]>(`${endpoint}/GetPriceById?priceId=${priceId}`);
  }

  savePrice(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceHeader);
    return this.http.post<PriceHeader>(`${endpoint}/SavePrice`, form);
  }

  updatePrice(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceHeader);
    return this.http.put<PriceHeader[]>(`${endpoint}/UpdatePrice`, form);
  }

  updatePriceListSendAuthorization(priceListSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceHeader);
    return this.http.put<PriceHeader[]>(`${endpoint}/UpdatePriceListSendAuthorization`, priceListSave);
  }

  deletePrice(priceId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointPriceHeader);
    return this.http.delete<PriceHeader>(`${endpoint}/DeletePrice?priceId=${priceId}&deleteBy=${deleteBy}`);
  }

}
