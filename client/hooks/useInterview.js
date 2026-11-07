"use client";

import { useState } from "react";
import questions from "@/data/question";
import { isValidInterviewFeedback } from "@/data/interviewContract";
import { submitAnswer } from "@/lib/interviewApi";

export function useInterview() {
    // All interview-related state
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState(questions[0].text);
    const [followUpsUsed, setFollowUpsUsed] = useState(0);
    const [questionFinished, setQuestionFinished] = useState(false);

    const isLastQuestion = questionIndex === questions.length - 1;
    const interviewFinished = isLastQuestion && questionFinished;

    // Submit the current answer
    const handleSubmit = async () => {
        if (answer.trim().length === 0 || isSubmitting || questionFinished)
            return;

        setIsSubmitting(true);
        setError(null);

        try {
            const feedback = await submitAnswer(
                { ...questions[questionIndex], text: currentPrompt },
                answer,
            );

            if (!isValidInterviewFeedback(feedback)) {
                throw new Error(
                    "The evaluator returned feedback in an unexpected format. Please try again.",
                );
            }

            setHistory((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    question: currentPrompt,
                    answer,
                    category: questions[questionIndex].category,
                    feedback,
                },
            ]);

            if (followUpsUsed < 1 && feedback.followUp) {
                setCurrentPrompt(feedback.followUp);
                setFollowUpsUsed((count) => count + 1);
            } else {
                setQuestionFinished(true);
            }

            setAnswer("");
        } catch (err) {
            setError(
                err.message || "Unable to score your answer. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Move to the next base question
    const handleNextQuestion = () => {
        if (!questionFinished || isLastQuestion || isSubmitting) return;

        const nextIndex = questionIndex + 1;

        setQuestionIndex(nextIndex);
        setCurrentPrompt(questions[nextIndex].text);
        setAnswer("");
        setFollowUpsUsed(0);
        setQuestionFinished(false);
        setError(null);
    };

    // Reset everything and begin a new interview
    const startNewSession = () => {
        setQuestionIndex(0);
        setAnswer("");
        setIsSubmitting(false);
        setError(null);
        setHistory([]);
        setCurrentPrompt(questions[0].text);
        setFollowUpsUsed(0);
        setQuestionFinished(false);
    };

    // Expose the state and functions to components
    return {
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
    };
}
