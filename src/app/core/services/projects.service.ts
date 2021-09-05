import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Project } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private endpointProjects: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointProjects = this.endPoints.getApiProjects;
  }

  getProjects() {
    const endpoint = this.settings.generateEndpoint(this.endpointProjects);
    return this.http.get<Project[]>(`${endpoint}/GetProjects`);
  }

  getProjectsById(projectId) {
    const endpoint = this.settings.generateEndpoint(this.endpointProjects);
    return this.http.get<Project>(`${endpoint}/GetProjectById?projectId=${projectId}`);
  }

  saveProjects(projectSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointProjects);
    return this.http.post<Project>(`${endpoint}/SaveProject`, projectSave);
  }

  updateProjects(projectSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointProjects);
    return this.http.put<Project>(`${endpoint}/UpdateProject`, projectSave);
  }

  deleteProjects(projectId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointProjects);
    return this.http.delete<Project>(`${endpoint}/DeleteProject?projectId=${projectId}&deleteBy=${deleteBy}`);
  }

}
