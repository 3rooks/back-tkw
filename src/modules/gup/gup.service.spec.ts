import { Test, TestingModule } from '@nestjs/testing';
import { GupService } from './gup.service';

describe('GupService', () => {
    let service: GupService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GupService]
        }).compile();

        service = module.get<GupService>(GupService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
