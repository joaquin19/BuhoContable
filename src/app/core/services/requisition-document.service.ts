import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { RequisitionDocument } from '../models/requisition-document';

@Injectable({
  providedIn: 'root'
})
export class RequisitionDocumentService {

  private RequisitionDocument: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.RequisitionDocument = this.endPoints.getApiRequisitionDocument;
  }

  getRequisitionDocumentsByHeaderId(RequisitionId) {
    const endpoint = this.settings.generateEndpoint(this.RequisitionDocument);
    return this.http.get<RequisitionDocument[]>(`${endpoint}/getRequisitionDocumentsByHeaderId?RequisitionId=${RequisitionId}`);
  }

  downloadRequisitionDocument(requisitionSave) {
    const endpoint = this.settings.generateEndpoint(this.RequisitionDocument);
    return this.http.post<Blob>(`${endpoint}/downloadRequisitionDocument`, requisitionSave, { responseType: 'blob' as 'json' });
  }

  deleteRequisitionDocument(requisitionId, documentId, documentName, path, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.RequisitionDocument);
    return this.http.delete<RequisitionDocument[]>(`${endpoint}/deleteRequisitionDocument?requisitionId=${requisitionId}&documentId=${documentId}&documentName=${documentName}&path=${path}&deleteBy=${deleteBy}`);
  }

}