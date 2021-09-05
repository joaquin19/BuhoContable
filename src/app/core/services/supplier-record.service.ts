import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { SupplierRecord } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierRecordService {

  private endpointSupplierRecord: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointSupplierRecord = this.endPoints.getApiSupplierRecord;
  }

  getSupplierRecordBySupplierId(supplierId) {
    const endpoint = this.settings.generateEndpoint(this.endpointSupplierRecord);
    return this.http.get<SupplierRecord>(`${endpoint}/getSupplierRecordBySupplierId?supplierId=${supplierId}`);
  }

}
