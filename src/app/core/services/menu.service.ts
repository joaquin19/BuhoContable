import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Menu, MenuProfileSystem } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private endpointMenu: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointMenu = this.endPoints.getApiMenu;
  }

  getMenu() {
    const endpoint = this.settings.generateEndpoint(this.endpointMenu);
    return this.http.get<Menu[]>(`${endpoint}/getMenu`);
  }

  getMenuByProfileSystemId(profileSystemId) {
    const endpoint = this.settings.generateEndpoint(this.endpointMenu);
    return this.http.get<MenuProfileSystem[]>(`${endpoint}/getMenuByProfileSystemId?profileSystemId=${profileSystemId}`);
  }

  getMenuByUser(user) {
    const endpoint = this.settings.generateEndpoint(this.endpointMenu);
    return this.http.get<MenuProfileSystem[]>(`${endpoint}/getMenuByUser?user=${user}`);
  }

}
