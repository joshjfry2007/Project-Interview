// Fixed categories used throughout the application
export const INTERVIEW_CATEGORIES = Object.freeze({
    BEHAVIORAL: "Behavioral",
    TECHNICAL_DEPTH: "Technical depth",
    COMMUNICATION: "Communication"
});

export const INTERVIEW_CATEGORY_LIST = Object.freeze(Object.values(INTERVIEW_CATEGORIES));

// Score names expected from the evaluator
export const SCORE_NAMES = ["clarity", "correctness", "confidence"];

/*
Feedback contract:

{
    scores: {
        clarity: number,
        correctness: number,
        confidence: number
    },
    followUp: string | null,
    evidence: [
        {
            quote: string,
            comment: string
        }
    ]
}
*/

// Validate the feedback received from the API
export function isValidInterviewFeedback(feedback) {
    if (!feedback || typeof feedback !== "object") return false;

    if (!feedback.scores || typeof feedback.scores !== "object") return false;

    const scoresAreValid = SCORE_NAMES.every((name) => {
        const value = feedback.scores[name];
        return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 10;
    });

    const followUpIsValid = feedback.followUp === undefined || feedback.followUp === null || typeof feedback.followUp === "string";

    const evidenceIsValid = Array.isArray(feedback.evidence) && feedback.evidence.every((item) =>
        item && typeof item.quote === "string" && typeof item.comment === "string"
    );

    return scoresAreValid && followUpIsValid && evidenceIsValid;
}