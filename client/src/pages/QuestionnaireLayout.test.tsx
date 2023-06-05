import { render, screen, fireEvent } from "@testing-library/react";
import QuestionnaireLayout from "./QuestionnaireLayout";

const questions = [
  {
    id: 1,
    question: "Quelle est la plus grande forêt tropicale du monde ?",
    answers: [
      { id: 1, answer: "Forêt amazonienne", isCorrect: true },
      { id: 2, answer: "Forêt du Congo", isCorrect: false },
      { id: 3, answer: "Forêt de Bornéo", isCorrect: false },
    ],
  },
  {
    id: 2,
    question:
      "Quel est le principal gaz à effet de serre responsable du réchauffement climatique ?",
    answers: [
      { id: 1, answer: "Dioxyde de carbone (CO2)", isCorrect: true },
      { id: 2, answer: "Méthane (CH4)", isCorrect: false },
      { id: 3, answer: "Protoxyde d'azote (N2O)", isCorrect: false },
    ],
  },
];

test("renders questionnaire layout", () => {
  render(<QuestionnaireLayout child={questions} questionType="environment" />);

  const titleElement = screen.getByText(
    "Teste tes connaissances sur l'environnement"
  );
  expect(titleElement).toBeInTheDocument();

  const questionElements = screen.getAllByRole("heading", { level: 3 });
  expect(questionElements.length).toBe(2);

  const answerElements = screen.getAllByRole("radio");
  expect(answerElements.length).toBe(6);
});

test("handles answer change", () => {
  render(<QuestionnaireLayout child={questions} questionType="environment" />);

  const answerElement = screen.getAllByRole("radio")[0] as HTMLInputElement;
  fireEvent.click(answerElement);

  expect(answerElement.checked).toBe(true);
});

test("handles form submission", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ score: 2 }),
  });

  render(
    <QuestionnaireLayout child={questions} questionType={"environment"} />
  );

  const answerElements = screen.getAllByRole("radio");
  fireEvent.click(answerElements[0]);
  fireEvent.click(answerElements[3]);

  const submitButton = screen.getByText("Soumettre");
  fireEvent.click(submitButton);

  const scoreElement = await screen.findByText("Tu as obtenu 2 point(s)");
  expect(scoreElement).toBeInTheDocument();
});
