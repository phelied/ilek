import React, { useEffect, useState } from "react";
import QuestionnaireLayout from "./QuestionnaireLayout";

const MitigationQuestion = () => {
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        fetch("/mitigation_questions")
            .then((response) => response.json())
            .then((data) => setQuestions(data));
    }, []);
    return (
        <div>
            {questions && <QuestionnaireLayout child={questions} questionType={"mitigation"} />}
        </div>
    );
};

export default MitigationQuestion;