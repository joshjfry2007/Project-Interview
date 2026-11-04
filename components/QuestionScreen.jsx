"use client";

import { useState } from "react";
import questions from "@/data/question";
import { submitAnswer } from "@/lib/interviewApi";
import HistoryEntry from "@/components/HistoryEntry";
import { Summary } from "@/components/Summary";


function QuestionScreen() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState(questions[0].text);
    const [followUpsUsed, setFollowUpsUsed] = useState(0);
    const [questionFinished, setQuestionFinished] = useState(false);

    const isLastQuestion = questionIndex === questions.length - 1;
    const interviewFinished = isLastQuestion && questionFinished;

    const handleSubmit = async () => {
        if (answer.trim().length === 0 || loading) return;
        setLoading(true);
        setError(null);

        try {
            const feedback = await submitAnswer({ ...questions[questionIndex], text: currentPrompt }, answer);
            
            setHistory((prev) => [
                ...prev, 
                { 
                    id: crypto.randomUUID(), 
                    question: currentPrompt, 
                    answer, 
                    category: questions[questionIndex].category, 
                    feedback: feedback 
                }
            ]);

            if (followUpsUsed < 1 && feedback?.followUp) {
                setCurrentPrompt(feedback.followUp);
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
                        <textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        <button id="submitbtn" disabled={answer.trim().length === 0 || loading} onClick={handleSubmit}>
                            {loading ? "L O A D I N G" : "S U B M I T"}
                        </button>
                    </>
                ) : (
                    <p>{isLastQuestion ? "Interview complete." : "Question complete. Press Next Question to continue."}</p>
                    
                )}

                {error && <p>{error}</p>}
                {interviewFinished && <Summary history={history} />}
                <div id="history">
                    {history.length > 0 && <h2>Previous answers</h2>}
                    {history.slice().reverse().map((entry, index) => (
                        <HistoryEntry key={entry.id} entry={entry} defaultOpen={index === 0} />
                    ))}
                </div>
            </div>

            <div id="questionSecondary">
                <p id="index">Q.No. {questions[questionIndex].id}</p>
                <p id="category" >{questions[questionIndex].category}</p>
                <button onClick={handleNextQuestion} disabled={isLastQuestion || loading}>
                    Next Question
                </button>
                {}
            </div>
        </div>
    );
}

export default QuestionScreen;
