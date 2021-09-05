import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { PreInvoice } from '../models/pre-invoice';

@Injectable({
  providedIn: 'root'
})
export class PreInvoiceService {

  private endpointPreInvoiceHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPreInvoiceHeader = this.endPoints.getApiPreInvoice;
  }

  getPreInvoice(userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointPreInvoiceHeader);
    return this.http.get<PreInvoice[]>(`${endpoint}/GetPreInvoice?userName=${userName}`);
  }

  getPreInvoiceById(preInvoiceId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPreInvoiceHeader);
    return this.http.get<PreInvoice[]>(`${endpoint}/GetPreInvoiceById?preInvoiceId=${preInvoiceId}`);
  }

  savePreInvoice(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointPreInvoiceHeader);
    return this.http.post<PreInvoice>(`${endpoint}/SavePreInvoice`, form);
  }

  updatePreInvoice(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointPreInvoiceHeader);
    return this.http.put<PreInvoice[]>(`${endpoint}/UpdatePreInvoice`, form);
  }

  updatePreInvoiceSendAuthorization(preInvoiceSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPreInvoiceHeader);
    return this.http.put<PreInvoice[]>(`${endpoint}/UpdatePreInvoiceSendAuthorization`, preInvoiceSave);
  }

  deletePreInvoice(preInvoiceId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointPreInvoiceHeader);
    return this.http.delete<PreInvoice>(`${endpoint}/DeletePreInvoice?preInvoiceId=${preInvoiceId}&deleteBy=${deleteBy}`);
  }
}
