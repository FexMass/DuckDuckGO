import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { DuckDuckInfoService } from './duckduckInfo.service';

// Mock http response
const mockHttpResponse: AxiosResponse = {
  data: 'Mock data',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: undefined,
  },
};

// Mock HttpService
const mockHttpService = {
  post: jest.fn().mockImplementationOnce(() => of(mockHttpResponse)),
};

describe('DuckDuckInfoService', () => {
  let service: DuckDuckInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DuckDuckInfoService],
      imports: [HttpModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    service = module.get<DuckDuckInfoService>(DuckDuckInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data when calling getDuckDuckGoInfo', async () => {
    const result = await service.getDuckDuckGoInfo();
    expect(result).toBe(mockHttpResponse.data);
  });
});
