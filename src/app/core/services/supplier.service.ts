import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private endpointSupplier: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplier = this.endPoints.getApiSupplier;
  }

  getSuppliers() {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplier);
    return this.http.get<Supplier[]>(`${endpoint}/getSuppliers`);
  }

  getSupplierById(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplier);
    return this.http.get<Supplier>(`${endpoint}/getSupplierById?supplierId=${supplierId}`);
  }

  saveSupplier(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplier);
    return this.http.post<Supplier>(`${endpoint}/saveSupplier`, form);
  }

  updateSupplier(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplier);
    return this.http.post<Supplier>(`${endpoint}/updateSupplier`, form);
  }

}
