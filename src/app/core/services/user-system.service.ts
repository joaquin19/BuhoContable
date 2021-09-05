import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { UserSystem } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  private endpointUserSystem: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointUserSystem = this.endPoints.getApiUserSystem;
  }

  getUsersSystem() {
    const endpoint = this.settings.generateEndpoint(this.endpointUserSystem);
    return this.http.get<UserSystem[]>(`${endpoint}/getUsersSystem`);
  }

  saveUserSystem(userSystemSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointUserSystem);
    return this.http.post<UserSystem>(`${endpoint}/saveUserSystem`, userSystemSave);
  }

  updateUserSystem(userSystemSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointUserSystem);
    return this.http.put<UserSystem>(`${endpoint}/updateUserSystem`, userSystemSave);
  }

  updateResetPassword(userSystemSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointUserSystem);
    return this.http.put<UserSystem>(`${endpoint}/updateResetPassword`, userSystemSave);
  }

  deleteUserSystem(userSystemId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointUserSystem);
    return this.http.delete<UserSystem>(`${endpoint}/deleteUserSystem?userSystemId=${userSystemId}&deleteBy=${deleteBy}`);
  }

  updateActiveUserSystem(userSystemActiveSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointUserSystem);
    return this.http.put<UserSystem>(`${endpoint}/updateActiveUserSystem`, userSystemActiveSave);
  }

}
