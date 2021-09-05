import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { ProductLevel } from '../models/product-level';

@Injectable({
  providedIn: 'root'
})
export class ProductLevelService {

  private endpointProductLevel: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProductLevel = this.endPoints.getApiProductLevel;
  }

  getProductTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointProductLevel);
    return this.http.get<ProductLevel[]>(`${endpoint}/GetProductLevels`);
  }
}
