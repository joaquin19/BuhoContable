import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectSettings {
    protected apiUrl$: string;
    protected developedBy$: string;
    protected projectName$: string;
    protected applicationName$: string;
    protected infoVersion$: string;
    protected itemsPage$: string[];
    protected base64Logo$: string;

    constructor() {
        this.apiUrl$ = environment.apiUrl;
        this.developedBy$ = environment.developedBy;
        this.projectName$ = environment.projectName;
        this.applicationName$ = environment.applicationName;
        this.infoVersion$ = environment.infoVersion;
        this.itemsPage$ = environment.itemsPage;
        this.base64Logo$ = environment.base64Logo;
    }

    public apiBase(): string {
        return this.apiUrl$;
    }

    public generateEndpoint(apiEndpoint: string): string {
        const base = this.apiUrl$;
        const url = `${base}/${apiEndpoint}`;
        return url;
    }

    public developedBy(): string {
        return this.developedBy$;
    }

    public projectName(): string {
        return this.projectName$;
    }

    public applicationName(): string {
        return this.applicationName$;
    }

    public infoVersion(): string {
        return this.infoVersion$;
    }

    public itemsPage(): string[] {
        return this.itemsPage$;
    }

    public base64Logo(): string {
        return this.base64Logo$;
    }

}
