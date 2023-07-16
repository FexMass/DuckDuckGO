import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

/**
 * @class SearchController
 * @description This controller handles HTTP requests related to search operations
 */
@Controller('search')
export class SearchController {
  /**
   * @constructor
   * @description Dependency injection of the SearchService
   * @param {SearchService} searchService - The SearchService instance for managing search operations
   */
  constructor(private readonly searchService: SearchService) {}

  /**
   * @public
   * @async
   * @function getResults
   * @description This method handles GET requests to search and fetch results from a third-party API
   * @param {string} query - The search term from the client
   * @returns {Promise<any>} - A promise that resolves to search results from the API, which consists of title and URL as JSON
   */
  @Get()
  async getResults(@Query('query') query: string) {
    return this.searchService.getResults(query);
  }
}
