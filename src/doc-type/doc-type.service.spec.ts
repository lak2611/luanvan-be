import { Test, TestingModule } from '@nestjs/testing';
import { DocTypeService } from './doc-type.service';

describe('DocTypeService', () => {
  let service: DocTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocTypeService],
    }).compile();

    service = module.get<DocTypeService>(DocTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
