import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { ProcessType } from '../models/process-type';

@Injectable({
  providedIn: 'root'
})
export class ProcessTypeService {

  private endpointProcessType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProcessType = this.endPoints.getApiProcessType;
  }

  getProcessTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointProcessType);
    return this.http.get<ProcessType[]>(`${endpoint}/getProcessTypes`);
  }


}
