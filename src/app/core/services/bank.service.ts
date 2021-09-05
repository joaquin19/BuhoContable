import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Bank } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private endpointBank: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointBank = this.endPoints.getApiBank;
  }

  getBanks() {
    const endpoint = this.settings.generateEndpoint(this.endpointBank);
    return this.http.get<Bank[]>(`${endpoint}/getBanks`);
  }

}
