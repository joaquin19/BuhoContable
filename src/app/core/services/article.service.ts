import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Article } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private endpointArticle: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointArticle = this.endPoints.getApiArticle;
  }

  getArticles() {
    const endpoint = this.settings.generateEndpoint(this.endpointArticle);
    return this.http.get<Article[]>(`${endpoint}/getArticles`);
  }

  getArticleById(articleId) {
    const endpoint = this.settings.generateEndpoint(this.endpointArticle);
    return this.http.get<Article>(`${endpoint}/getArticleById?articleId=${articleId}`);
  }

  saveArticle(articleSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointArticle);
    return this.http.post<Article>(`${endpoint}/saveArticle`, articleSave);
  }

  updateArticle(articleSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointArticle);
    return this.http.put<Article>(`${endpoint}/updateArticle`, articleSave);
  }

  deleteArticle(articleId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointArticle);
    return this.http.delete<Article>(`${endpoint}/deleteArticle?articleId=${articleId}&deleteBy=${deleteBy}`);
  }

}
