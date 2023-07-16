import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { DuckDuckInfoController } from './duckInfo/duckDuckInfo.controller';
import { HttpModule } from '@nestjs/axios';
import { DuckDuckInfoService } from './duckInfo/duckduckInfo.service';

/**
 * @class SearchModule
 * @description This module encapsulates the components related to search operations
 */
@Module({
  imports: [HttpModule],
  providers: [SearchService, DuckDuckInfoService],
  controllers: [SearchController, DuckDuckInfoController],
})
export class SearchModule {}
