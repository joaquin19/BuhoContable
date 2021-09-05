
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Project } from '../models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private endpointProject: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProject = this.endPoints.getApiProjects;
  }

  getProjects() {
    const endpoint = this.settings.generateEndpoint(this.endpointProject);
    return this.http.get<Project[]>(`${endpoint}/getProjects`);
  }

}
