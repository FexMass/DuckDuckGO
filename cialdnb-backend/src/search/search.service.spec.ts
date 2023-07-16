import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SearchService } from './search.service';

// Mock http response
const mockHttpResponse: AxiosResponse = {
  data: {
    RelatedTopics: [
      { FirstURL: 'Mock URL 1', Text: 'Mock Text 1' },
      { FirstURL: 'Mock URL 2', Text: 'Mock Text 2' },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: undefined,
  },
};

// Mock HttpService
const mockHttpService = {
  get: jest.fn().mockImplementationOnce(() => of(mockHttpResponse)),
};

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
      imports: [HttpModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getResults should return transformed data', async () => {
    const results = await service.getResults('test');
    expect(results).toEqual([
      { url: 'Mock URL 1', title: 'Mock Text 1' },
      { url: 'Mock URL 2', title: 'Mock Text 2' },
    ]);
  });
});
