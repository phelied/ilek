import React, { useEffect, useState } from "react";
import QuestionnaireLayout from "./QuestionnaireLayout";

export const EnvironmentQuestion = () => {
const [questions, setQuestions] = useState(null);

  useEffect(() => {
  fetch("/environment_questions")
      .then((response) => response.json())
        .then((data) => setQuestions(data));
    }, []);

  return  (
    <div>
      {questions && <QuestionnaireLayout child={questions} questionType={"environment"}/>}
    </div>
  );
}
export default EnvironmentQuestion;