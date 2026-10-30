import { useState } from "react";
import questions from "../data/question.js";
import { submitAnswer } from "../services/InterviewAPI.js";
import HistoryEntry from "./historyEntry.jsx";


function Display() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState(questions[0].text);
    const [followUpsUsed, setFollowUpsUsed] = useState(0);
    const [questionFinished, setQuestionFinished] = useState(false);

    const isLastQuestion = questionIndex === questions.length - 1;

    const handleSubmit = async () => {
        if (answer.trim().length === 0 || loading) return;
        setLoading(true);
        setError(null);

        try {
            const x = await submitAnswer({ ...questions[questionIndex], text: currentPrompt }, answer);
            
            setHistory((prev) => [
                ...prev, 
                { 
                    id: crypto.randomUUID(), 
                    question: currentPrompt, 
                    answer, 
                    category: questions[questionIndex].category, 
                    feedback: x 
                }
            ]);

            if (followUpsUsed < 1 && x?.followUp) {
                setCurrentPrompt(x.followUp);
                setFollowUpsUsed((n) => n + 1);
            } else {
                setQuestionFinished(true);
            }
            setAnswer("");
        } catch (err) {
            setError(err.message || "Unable to score your answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (questionIndex >= questions.length - 1) return;
        const nextIndex = questionIndex + 1;
        setQuestionIndex(nextIndex);
        setCurrentPrompt(questions[nextIndex].text);
        setAnswer("");
        setFollowUpsUsed(0);
        setQuestionFinished(false);
        setError(null);
    };

    return (
        <div id="entireQuestionScreen">
            <div id="questionBox">
                <h1>Question : {currentPrompt}</h1>

                {!questionFinished ? (
                    <>
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        <button disabled={answer.trim().length === 0 || loading} onClick={handleSubmit}>
                            {loading ? "L O A D I N G" : "S U B M I T"}
                        </button>
                    </>
                ) : (
                    <p>{isLastQuestion ? "Interview complete." : "Question complete. Press Next Question to continue."}</p>
                )}

                {error && <p>{error}</p>}

                {history.length > 0 && <h2>Previous answers</h2>}

                {history.slice().reverse().map((entry, index) => (
                    <HistoryEntry key={entry.id} entry={entry} defaultOpen={index === 0} />
                ))}
            </div>

            <div id="questionSecondary">
                <p>{questions[questionIndex].id}</p>
                <p>{questions[questionIndex].category}</p>
                <button onClick={handleNextQuestion} disabled={isLastQuestion || loading}>
                    Next Question
                </button>
            </div>
        </div>
    );
}

export default Display;