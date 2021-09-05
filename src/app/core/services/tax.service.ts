import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Tax } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private endpointTax: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointTax = this.endPoints.getApiTax;
  }

  getTaxes() {
    const endpoint = this.settings.generateEndpoint(this.endpointTax);
    return this.http.get<Tax[]>(`${endpoint}/getTaxes`);
  }

  getTaxesByArticleId(articleId) {
    const endpoint = this.settings.generateEndpoint(this.endpointTax);
    return this.http.get<Tax[]>(`${endpoint}/getTaxesByArticleId?articleId=${articleId}`);
  }

  getTaxesByProductId(productId) {
    const endpoint = this.settings.generateEndpoint(this.endpointTax);
    return this.http.get<Tax[]>(`${endpoint}/getTaxesByProductId?productId=${productId}`);
  }
}
