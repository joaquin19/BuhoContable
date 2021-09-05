import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings } from '../constants';
import { EndpointsConstants } from '../constants/endpoint-constants';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private endpointProduct: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProduct = this.endPoints.getApiProduct;
  }

  getProducts() {
    const endpoint = this.settings.generateEndpoint(this.endpointProduct);
    return this.http.get<Product[]>(`${endpoint}/GetProducts`);
  }

  getProductById(productId) {
    const endpoint = this.settings.generateEndpoint(this.endpointProduct);
    return this.http.get<Product>(`${endpoint}/GetProductById?productId=${productId}`);
  }

  saveProduct(productSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointProduct);
    return this.http.post<Product>(`${endpoint}/SaveProduct`, productSave);
  }

  updateProduct(productSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointProduct);
    return this.http.put<Product>(`${endpoint}/UpdateProduct`, productSave);
  }

  deleteProduct(productId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointProduct);
    return this.http.delete<Product>(`${endpoint}/DeleteProduct?productId=${productId}&deleteBy=${deleteBy}`);
  }
}
