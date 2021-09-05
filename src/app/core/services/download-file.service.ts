import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  private DownloadFile: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.DownloadFile = this.endPoints.getApiDownloadFile;
  }

  getTemplate(templateId) {
    const endpoint = this.settings.generateEndpoint(this.DownloadFile);
    return this.http.get<Blob>(`${endpoint}/getTemplate?templateId=${templateId}`, { responseType: 'blob' as 'json' });
  }
}