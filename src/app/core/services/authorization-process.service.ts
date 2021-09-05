import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { AuthorizationProcess } from '../models/authorization-process';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationProcessService {

  private endpointAuthorizationProcess: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointAuthorizationProcess = this.endPoints.getApiAuthorizationProcess;
  }

  getAuthorizations(processTypeId, userName, authorizationStatusId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizationProcess);
    return this.http.get<AuthorizationProcess[]>(`${endpoint}/getAuthorizations?processTypeId=${processTypeId}&userName=${userName}&authorizationStatusId=${authorizationStatusId}`);
  }

  getAuthorizationsByProcessTypeId(processTypeId, valueId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizationProcess);
    return this.http.get<AuthorizationProcess[]>(`${endpoint}/getAuthorizationsByProcessTypeId?processTypeId=${processTypeId}&valueId=${valueId}`);
  }

  getObservations(processTypeId, userName, valueId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizationProcess);
    return this.http.get<AuthorizationProcess[]>(`${endpoint}/getObservations?processTypeId=${processTypeId}&userName=${userName}&valueId=${valueId}`);
  }

  saveAuthorizationProcess(authorizationSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizationProcess);
    return this.http.post<AuthorizationProcess>(`${endpoint}/saveAuthorization`, authorizationSave);
  }

  updateAuthorizationProcess(authorizationSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizationProcess);
    return this.http.post<AuthorizationProcess[]>(`${endpoint}/updateAuthorization`, authorizationSave);
  }

  deleteAuthorization(authorizationProcessId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizationProcess);
    return this.http.delete<AuthorizationProcess>(`${endpoint}/deleteAuthorization?authorizationProcessId=${authorizationProcessId}&deleteBy=${deleteBy}`);
  }
}