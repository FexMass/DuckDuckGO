import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

// Mock SearchService
const mockSearchService = {
  getDuckDuckGoInfo: jest
    .fn()
    .mockImplementation(() => Promise.resolve('Mock data')),
  getResults: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve([{ url: 'Mock URL', title: 'Mock Title' }]),
    ),
};

describe('SearchController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getResults should return the response of the SearchService.getResults', async () => {
    const result = await controller.getResults('test');
    expect(result).toEqual([{ url: 'Mock URL', title: 'Mock Title' }]);
    expect(mockSearchService.getResults).toHaveBeenCalledWith('test');
  });
});
