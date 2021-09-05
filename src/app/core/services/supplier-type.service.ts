import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierType } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierTypeService {

  private endpointSupplierType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierType = this.endPoints.getApiSupplierType;
  }

  getSupplierTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierType);
    return this.http.get<SupplierType[]>(`${endpoint}/getSupplierTypes`);
  }

}
