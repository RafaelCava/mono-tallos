import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';

describe('Groups', () => {
  let provider: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService],
    }).compile();

    provider = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
