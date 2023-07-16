import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

/**
 * @interface RelatedTopic
 * @description Interface for structure of related topics retrieved from API
 */
interface RelatedTopic {
  FirstURL: string;
  Text: string;
}

@Injectable()
export class SearchService {
  constructor(private httpService: HttpService) {}

  /**
   * Method to fetch results from DuckDuckGo API based on the provided search query
   * @param query String representing the search query
   * @returns An array of search results with 'url' and 'title', or an error message
   */
  private async fetchResults(query: string): Promise<any> {
    const response$ = this.httpService.get(`http://api.duckduckgo.com/`, {
      params: {
        q: query,
        format: 'json',
      },
    });
    const response = await lastValueFrom(response$);

    if (
      !Array.isArray(response.data.RelatedTopics) ||
      response.data.RelatedTopics.length === 0
    ) {
      return [{ url: 'No results found', title: '' }];
    }

    return response.data.RelatedTopics.map((relatedTopic: RelatedTopic) => ({
      url: relatedTopic.FirstURL,
      title: relatedTopic.Text,
    })).filter((topic: { url: any; title: any }) => topic.url || topic.title);
  }

  /**
   * Public method to get search results by using the private fetchResults method
   * @param query String representing the search query
   * @returns A promise resolving to the fetched results
   */
  async getResults(query: string): Promise<any> {
    return this.fetchResults(query);
  }
}
