import React from "react";
import { useEffect, useState } from "react";
import "./QuestionnaireLayout.css";

interface Props {
  child: any;
  questionType: string;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface Answer {
  answer: string;
}

const QuestionnaireLayout = ({ child, questionType }: Props) => {
  const [questions, setQuestions] = useState<any>();
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    setQuestions(child);
  }, [child]);

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setAnswers((prevAnswers: { [questionId: number]: number }) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {

    const userAnswers = questions.map((question: Question) => ({
      questionId: question.id,
      answerId: answers[question.id],
    }));

    fetch("/calculate_score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userAnswers: userAnswers, questionType: questionType}),
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
      })
      .catch((error) => {
        console.error("Erreur lors du calcul du score :", error);
      });
  };

  return (
    <div className="App">
      <h1 className="title">Teste tes connaissances sur l'environnement</h1>
      {questions && questions.length > 0 ? (
        <div className="questionnaire">
          {questions.map((question: Question) => (
            <div className="question" key={question.id}>
              <h3 className="question-title">{question.question}</h3>
              <ul className="answers-list">
                {question.answers.map((answer, index) => (
                  <li className="answer" key={index}>
                    <input
                      type="radio"
                      id={`answer-${question.id}-${index}`}
                      name={`question-${question.id}`}
                      checked={answers[question.id] === index}
                      onChange={() => handleAnswerChange(question.id, index)}
                    />
                    <label
                      htmlFor={`answer-${question.id}-${index}`}
                      className="answer-label"
                    >
                      {answer.answer}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="submit-button" onClick={handleSubmit}>
            Soumettre
          </button>
          {score !== null && (
            <p className="score">Tu as obtenu {score} point(s)</p>
          )}
          <p>
            Passe un autre quiz pour découvrir comment tu peux aider à protéger
            l'environnement :
            <a href="/2" className="link">
              Clique ici
            </a>
          </p>
        </div>
      ) : (
        <p>Chargement des questions...</p>
      )}
    </div>
  );
};

export default QuestionnaireLayout;
