import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './mitigationQuestionsService';

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    private readonly mitigationQuestionsService: MitigationQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): any {
    try {
      const questions = this.environmentQuestionsService.getQuestions();
      if (!questions || questions.length === 0) {
        throw new HttpException('No questions found', HttpStatus.NOT_FOUND);
      }
      return questions;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): any {
    try {
      const questions = this.mitigationQuestionsService.getQuestions();
      if (!questions || questions.length === 0) {
        throw new HttpException('No questions found', HttpStatus.NOT_FOUND);
      }
      return questions;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('calculate_score')
  calculateScore(@Body() userAnswers: any): any {
    try {
      let score : number;
      if (userAnswers.questionType === 'environment') {
        score = this.environmentQuestionsService.calculateScore(userAnswers.userAnswers);
      } else {
        score = this.mitigationQuestionsService.calculateScore(userAnswers.userAnswers);
      }
      return { score };
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
