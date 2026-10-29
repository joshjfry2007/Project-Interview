import { useState } from "react";
import  questions  from "../data/question.js";
import { submitAnswer } from "../services/InterviewAPI.js";

function Display() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [currentPromt, setCurrentPrompt] = useState("");
    const [followUpsUsed, setFollowUpsUsed] = useState(0);
    const [questionFinished, setQuestionFinished] = useState(false);


    const handleSubmit = async () => {
        if(answer.trim().length === 0) return;
        if(loading) return;
        setLoading(true);
        setError(null);

        try{
            const x = await submitAnswer(questions[questionIndex], answer);
            setHistory([...history, {id: crypto.randomUUID(),question : currentPromt, answer, x}]);
            if(followUpsUsed < 1 && x.followUp){
                setCurrentPrompt(x.followUp);
                setFollowUpsUsed(followUpsUsed + 1);
                setAnswer("");
            }
            else{
                setQuestionFinished(true);
                setFollowUpsUsed(0);
                setAnswer("");
            }
        } catch (err) {
            setError(err.message || "Unable to score your answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (questionIndex > questions.length - 1) return;
        setQuestionIndex(questionIndex + 1);
        setCurrentPrompt(questions[questionIndex + 1].text);
        setAnswer("");
        setFollowUpsUsed(0);
        setError(null);
    }

    return (
        <div id="entireQuestionScreen">
            <div id="questionBox">
                <h1>Question : {currentPromt}</h1>

                {history.map((entry) => (
                <div key={entry.id}>
                    <h3>{entry.question}</h3>
                    <p><strong>Your answer:</strong> {entry.answer}</p>

                    <h4>Scores</h4>
                    {Object.entries(entry.x.scores || {}).map(
                        ([name, value]) => (
                            <p key={name}>{name}: {value}/10</p>
                        )
                    )}

                    <h4>Evidence</h4>
                    {Array.isArray(entry.x.evidence) ? (
                        entry.x.evidence.map((item, index) => (
                            <p key={`${entry.id}-evidence-${index}`}>{item.quote} — {item.comment}</p>
                        ))
                    ) : (
                        <p>{entry.x.evidence}</p>
                    )}
                    <hr />
                </div>
                ))}

                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <button disabled={answer.trim().length === 0 || loading} onClick={handleSubmit}>
                    {loading ? "L O A D I N G" : "S U B M I T"}
                </button>
                {error && <p>{error}</p>}
            </div>

            <div id="questionSecondary">
                <p>{questions[questionIndex].id}</p>
                <p>{questions[questionIndex].category}</p>
                <button
                    onClick={handleNextQuestion}
                    disabled={questionIndex === questions.length - 1 || loading}
                >
                    Next Question
                </button>
            </div>
        </div>
    );
}

export default Display;
