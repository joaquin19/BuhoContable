import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SaleSupportHeader } from '../models/sale-support-header';

@Injectable({
  providedIn: 'root'
})
export class SaleSupportHeaderService {

  private endpointSaleSupportHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSaleSupportHeader = this.endPoints.getApiSaleSupportHeader;
  }

  getSaleSupports(userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportHeader);
    return this.http.get<SaleSupportHeader[]>(`${endpoint}/getSaleSupports?userName=${userName}`);
  }

  getSaleSupportById(saleSupportId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportHeader);
    return this.http.get<SaleSupportHeader[]>(`${endpoint}/getSaleSupportById?saleSupportId=${saleSupportId}`);
  }

  saveSaleSupport(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportHeader);
    return this.http.post<SaleSupportHeader>(`${endpoint}/saveSaleSupport`, form);
  }

  updateSaleSupport(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportHeader);
    return this.http.put<SaleSupportHeader[]>(`${endpoint}/updateSaleSupport`, form);
  }

  deleteSaleSupport(saleSupportId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportHeader);
    return this.http.delete<SaleSupportHeader>(`${endpoint}/deleteSaleSupport?saleSupportId=${saleSupportId}&deleteBy=${deleteBy}`);
  }

  getSaleSupportReport(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointSaleSupportHeader);
    return this.http.post<Blob>(`${endpoint}/getSaleSupportReport`, form, { responseType: 'blob' as 'json' });
  }

}