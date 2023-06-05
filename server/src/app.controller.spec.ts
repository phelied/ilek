import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './mitigationQuestionsService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EnvironmentQuestionsService, MitigationQuestionsService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return some questions', () => {
      expect(appController.getEnvironmentQuestions().length).toBeGreaterThan(0);
    });
  });

  describe('EnvironmentQuestionsService', () => {
    let environmentQuestionsService: EnvironmentQuestionsService;

    beforeEach(() => {
      environmentQuestionsService = new EnvironmentQuestionsService();
    });

    describe('calculateScore', () => {
      test('calculates the score correctly for user answers', () => {
        const userAnswers = [
          { questionId: 1, answerId: 0 },
          { questionId: 2, answerId: 1 },
          { questionId: 3, answerId: 2 },
        ];

        const score = environmentQuestionsService.calculateScore(userAnswers);

        expect(score).toBe(2);
      });

      test('returns 0 when user answers are empty', () => {
        const userAnswers = [];

        const score = environmentQuestionsService.calculateScore(userAnswers);

        expect(score).toBe(0);
      });
    });

    describe('getQuestions', () => {
      test('returns an array of random questions', () => {
        const questions = environmentQuestionsService.getQuestions();

        expect(Array.isArray(questions)).toBe(true);
        expect(questions.length).toBe(5);
      });
    });
  });
});
