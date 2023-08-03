import { Test, TestingModule } from '@nestjs/testing';
import { GupController } from './gup.controller';
import { GupService } from './gup.service';

describe('GupController', () => {
    let controller: GupController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GupController],
            providers: [GupService]
        }).compile();

        controller = module.get<GupController>(GupController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
