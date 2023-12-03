import { Test, TestingModule } from '@nestjs/testing';
import { NonstudentService } from './nonstudent.service';

describe('NonstudentService', () => {
  let service: NonstudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NonstudentService],
    }).compile();

    service = module.get<NonstudentService>(NonstudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
