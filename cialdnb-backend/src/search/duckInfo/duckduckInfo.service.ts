import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

/**
 * @class DuckDuckInfoService
 * @description This service class handles requests to the DuckDuckGo API
 */
@Injectable()
export class DuckDuckInfoService {
  /**
   * @constructor
   * @description Dependency injection of the HttpService
   * @param {HttpService} httpService - The HttpService instance for performing HTTP requests
   */
  constructor(private httpService: HttpService) {}

  /**
   * @public
   * @async
   * @function getDuckDuckGoInfo
   * @description This method makes a POST request to DuckDuckGo API and returns the data
   * @returns {Promise<string>} - A promise that resolves to the data from the DuckDuckGo API
   */
  async getDuckDuckGoInfo(): Promise<string> {
    const response$ = this.httpService.post('https://api.duckduckgo.com/');
    const response = await lastValueFrom(response$);
    return response.data;
  }
}
