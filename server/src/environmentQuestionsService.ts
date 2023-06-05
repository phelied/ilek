import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';

@Injectable()
export class EnvironmentQuestionsService {
  questions = environmentQuestions;

  calculateScore(userAnswers: any): number {
    let score = 0;

    userAnswers.forEach((userAnswer: any) => {
      const question = this.questions.find((q: any) => q.id === userAnswer.questionId);

      if (question && question.answers[userAnswer.answerId]?.isCorrect) {
        score++;
      }
    });

    return score;
  }

  protected getRandomQuestions(): any {
    const randomIndices = [];

    while (randomIndices.length < 5) {
      const randomIndex = Math.floor(Math.random() * this.questions.length);

      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    return randomIndices.map((index) => {
      const question = JSON.parse(JSON.stringify(this.questions[index]));

      question.answers.forEach((answer) => {
        delete answer.isCorrect;
      });

      return question;
    });
  }

  getQuestions(): any {
    return this.getRandomQuestions();
  }
}
