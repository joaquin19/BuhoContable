import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { MerchandiseReceptionDocument } from '../models/merchandise-reception-document';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseReceptionDocumentService {

  private endpointMerchandiseReceptionDocument: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointMerchandiseReceptionDocument = this.endPoints.getApiMerchandiseReceptionDocument;
  }

  getMerchandiseReceptionDocumentsByMRH(merchandiseReceptionId) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDocument);
    return this.http.get<MerchandiseReceptionDocument[]>(`${endpoint}/getMerchandiseReceptionDocumentsByMRH?merchandiseReceptionId=${merchandiseReceptionId}`);
  }

  getMerchandiseReceptionDocumentsByMRD(merchandiseReceptionId, merchandiseReceptionDetailId) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDocument);
    return this.http.get<MerchandiseReceptionDocument[]>(`${endpoint}/getMerchandiseReceptionDocumentsByMRD?merchandiseReceptionId=${merchandiseReceptionId}&merchandiseReceptionDetailId=${merchandiseReceptionDetailId}`);
  }

  downloadMerchandiseReceptionDocument(merchandiseReceptionDocument) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDocument);
    return this.http.post<Blob>(`${endpoint}/downloadMerchandiseReceptionDocument`, merchandiseReceptionDocument, { responseType: 'blob' as 'json' });
  }

  deleteMerchandiseReceptionDocument(merchandiseReceptionId, merchandiseReceptionDetailId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointMerchandiseReceptionDocument);
    return this.http.delete<MerchandiseReceptionDocument[]>(`${endpoint}/deleteMerchandiseReceptionDocument?merchandiseReceptionId=${merchandiseReceptionId}&merchandiseReceptionDetailId=${merchandiseReceptionDetailId}&deleteBy=${deleteBy}`);
  }

}