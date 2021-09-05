import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierDocumentType } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierDocumentTypeService {

  private endpointSupplierDocumentType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierDocumentType = this.endPoints.getApiSupplierDocumentType;
  }

  getSupplierDocumentTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierDocumentType);
    return this.http.get<SupplierDocumentType[]>(`${endpoint}/getSupplierDocumentTypes`);
  }

}
