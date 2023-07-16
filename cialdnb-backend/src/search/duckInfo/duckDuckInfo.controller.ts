import { Controller, Post } from '@nestjs/common';
import { DuckDuckInfoService } from './duckduckInfo.service';

/**
 * @class DuckDuckInfoController
 * @description The controller class that handles the API endpoint to retrieve information from DuckDuckGo
 */
@Controller('info')
export class DuckDuckInfoController {
  /**
   * @constructor
   * @description Dependency injection of the DuckDuckInfoService
   * @param {DuckDuckInfoService} duckDuckInfoService - The service related to DuckDuckGo information retrieval
   */
  constructor(private readonly duckDuckInfoService: DuckDuckInfoService) {}

  /**
   * @public
   * @function getDuckDuckGoInfo
   * @description API endpoint handler method that uses DuckDuckInfoService to retrieve HTML data from DuckDuckGo API.
   * The @Post() decorator indicates that this method is responsible for handling HTTP POST requests
   * @returns {Promise<string>} - A promise that resolves to the HTML content from DuckDuckGo
   */
  @Post()
  getDuckDuckGoInfo(): Promise<string> {
    return this.duckDuckInfoService.getDuckDuckGoInfo();
  }
}
