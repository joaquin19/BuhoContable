import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { ProfileSystem } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProfileSystemService {

  private endpointProfileSystem: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProfileSystem = this.endPoints.getApiProfileSystem;
  }

  getProfilesSystem() {
    const endpoint = this.settings.generateEndpoint(this.endpointProfileSystem);
    return this.http.get<ProfileSystem[]>(`${endpoint}/getProfilesSystem`);
  }

  getProfileSystemById(profileSystemId) {
    const endpoint = this.settings.generateEndpoint(this.endpointProfileSystem);
    return this.http.get<ProfileSystem>(`${endpoint}/getProfileSystemById?profileSystemId=${profileSystemId}`);
  }

  saveProfilesSystem(profileSystemSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointProfileSystem);
    return this.http.post<ProfileSystem>(`${endpoint}/saveProfileSystem`, profileSystemSave);
  }

  updateProfileSystem(profileSystemSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointProfileSystem);
    return this.http.put<ProfileSystem>(`${endpoint}/updateProfileSystem`, profileSystemSave);
  }

  deleteProfileSystem(profileSystemId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointProfileSystem);
    return this.http.delete<ProfileSystem>(`${endpoint}/deleteProfileSystem?profileSystemId=${profileSystemId}&deleteBy=${deleteBy}`);
  }

}
