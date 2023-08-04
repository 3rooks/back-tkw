import { Test, TestingModule } from '@nestjs/testing';
import { DanController } from './dan.controller';
import { DanService } from './dan.service';

describe('DanController', () => {
    let controller: DanController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DanController],
            providers: [DanService]
        }).compile();

        controller = module.get<DanController>(DanController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
