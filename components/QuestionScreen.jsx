"use client";

import HistoryEntry from "@/components/HistoryEntry";
import { Summary } from "@/components/Summary";
import { useInterview } from "@/hooks/useInterview";

function QuestionScreen() {
    const {
        questions,
        questionIndex,
        answer,
        setAnswer,
        isSubmitting,
        error,
        history,
        currentPrompt,
        questionFinished,
        isLastQuestion,
        interviewFinished,
        handleSubmit,
        handleNextQuestion,
        startNewSession,
    } = useInterview();

    if (interviewFinished) {
        return (
            <div id="entireQuestionScreen">
                <div id="questionBox">
                    <Summary history={history} onStartNewSession={startNewSession} />
                </div>
            </div>
        );
    }

    return (
        <div id="entireQuestionScreen">
            <div id="questionBox">
                <h1>Question : {currentPrompt}</h1>

                {!questionFinished ? (
                    <>
                        <textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={isSubmitting} />
                        <button id="submitbtn" disabled={answer.trim().length === 0 || isSubmitting} onClick={handleSubmit}>
                            {isSubmitting ? "EVALUATING..." : "S U B M I T"}
                        </button>
                    </>
                ) : (
                    <p>{isLastQuestion ? "Interview complete. Preparing your summary..." : "Question complete. Press Next Question to continue."}</p>
                )}

                {isSubmitting && <p role="status" aria-live="polite">Your answer is being evaluated. Please wait...</p>}

                {error && <p role="alert" className="text-red-700">{error}</p>}

                <div id="history">
                    {history.length > 0 && <h2>Previous answers</h2>}

                    {history.slice().reverse().map((entry, index) => (
                        <HistoryEntry key={entry.id} entry={entry} defaultOpen={index === 0} />
                    ))}
                </div>
            </div>

            <div id="questionSecondary" className="ml-3">
                <p id="index">Q.No. {questions[questionIndex].id}</p>
                <p id="category">{questions[questionIndex].category}</p>

                <button onClick={handleNextQuestion} disabled={!questionFinished || isLastQuestion || isSubmitting} className="bg-[#5F9EA0] p-1 text-black hover:bg-[#4F8A8B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    Next Question
                </button>
            </div>
        </div>
    );
}

export default QuestionScreen;