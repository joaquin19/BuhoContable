import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Country } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private endpointCountry: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCountry = this.endPoints.getApiCountry;
  }

  getCountries() {
    const endpoint = this.settings.generateEndpoint(this.endpointCountry);
    return this.http.get<Country[]>(`${endpoint}/getCountries`);
  }

}
