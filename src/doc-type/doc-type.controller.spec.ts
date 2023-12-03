import { Test, TestingModule } from '@nestjs/testing';
import { DocTypeController } from './doc-type.controller';
import { DocTypeService } from './doc-type.service';

describe('DocTypeController', () => {
  let controller: DocTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocTypeController],
      providers: [DocTypeService],
    }).compile();

    controller = module.get<DocTypeController>(DocTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
