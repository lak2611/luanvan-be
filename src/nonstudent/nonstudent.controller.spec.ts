import { Test, TestingModule } from '@nestjs/testing';
import { NonstudentController } from './nonstudent.controller';
import { NonstudentService } from './nonstudent.service';

describe('NonstudentController', () => {
  let controller: NonstudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonstudentController],
      providers: [NonstudentService],
    }).compile();

    controller = module.get<NonstudentController>(NonstudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
