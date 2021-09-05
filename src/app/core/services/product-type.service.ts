import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectSettings } from '../constants';
import { EndpointsConstants } from '../constants/endpoint-constants';
import { ProductType } from '../models/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private endpointProductType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProductType = this.endPoints.getApiProductType;
  }

  getProductTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointProductType);
    return this.http.get<ProductType[]>(`${endpoint}/GetProductTypes`);
  }
}
