import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { ProjectCustomer } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectCustomerService {

  private endpointProjectCustomer: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProjectCustomer = this.endPoints.getApiProjectCustomer;
  }

  getProjectCustomers(projectId) {
    const endpoint = this.settings.generateEndpoint(this.endpointProjectCustomer);
    return this.http.get<ProjectCustomer[]>(`${endpoint}/GetProjectCustomers?projectId=${projectId}`);
  }

}
