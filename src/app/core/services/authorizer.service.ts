import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Authorizer } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizerService {

  private endpointAuthorizer: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointAuthorizer = this.endPoints.getApiAuthorizer;
  }

  getAuthorizers() {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.get<Authorizer[]>(`${endpoint}/getAuthorizers`);
  }

  getAuthorizerById(authorizerId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.get<Authorizer>(`${endpoint}/getAuthorizerById?authorizerId=${authorizerId}`);
  }

  saveAuthorizer(authorizerSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.post<Authorizer>(`${endpoint}/saveAuthorizer`, authorizerSave);
  }

  updateAuthorizer(authorizerSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.put<Authorizer>(`${endpoint}/updateAuthorizer`, authorizerSave);
  }

  deleteAuthorizer(authorizerId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.delete<Authorizer>(`${endpoint}/deleteAuthorizer?authorizerId=${authorizerId}&deleteBy=${deleteBy}`);
  }

  getAuthorizerByProcessTypeId(processTypeId) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.get<Authorizer[]>(`${endpoint}/getAuthorizerByProcessTypeId?processTypeId=${processTypeId}`);
  }

  updateAuthorizerOrder(authorizerOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointAuthorizer);
    return this.http.put<Authorizer[]>(`${endpoint}/updateAuthorizerOrder`, authorizerOrderSave);
  }

}
