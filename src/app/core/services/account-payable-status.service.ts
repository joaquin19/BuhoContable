import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { AccountPayableStatus } from '@app/core/models';

@Injectable({
    providedIn: 'root'
})
export class AccountPayableStatusService {

    private endpointAccountPayableStatus: string;

    constructor(
        private http: HttpClient,
        private settings: ProjectSettings,
        private endPoints: EndpointsConstants
    ) {
        this.endpointAccountPayableStatus = this.endPoints.getApiAccountPayableStatus;
    }

    getAccountPayableStatus() {
        const endpoint = this.settings.generateEndpoint(this.endpointAccountPayableStatus);
        return this.http.get<AccountPayableStatus[]>(`${endpoint}/getAccountPayableStatus`);
    }

}
