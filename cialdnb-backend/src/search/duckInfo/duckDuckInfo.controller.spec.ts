import { Test, TestingModule } from '@nestjs/testing';
import { DuckDuckInfoController } from './duckduckinfo.controller';
import { DuckDuckInfoService } from './duckduckinfo.service';

// A mock service for testing
const mockService = {
  getDuckDuckGoInfo: jest
    .fn()
    .mockImplementation(() => Promise.resolve('Mock data')),
};

describe('DuckDuckInfoController', () => {
  let controller: DuckDuckInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DuckDuckInfoController],
      providers: [{ provide: DuckDuckInfoService, useValue: mockService }],
    }).compile();

    controller = module.get<DuckDuckInfoController>(DuckDuckInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return data from the service', async () => {
    expect(await controller.getDuckDuckGoInfo()).toBe('Mock data');
  });
});
