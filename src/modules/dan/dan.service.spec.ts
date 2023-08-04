import { Test, TestingModule } from '@nestjs/testing';
import { DanService } from './dan.service';

describe('DanService', () => {
    let service: DanService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DanService]
        }).compile();

        service = module.get<DanService>(DanService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
