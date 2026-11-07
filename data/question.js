import { INTERVIEW_CATEGORIES } from "@/data/interviewContract";

const questions = [
    {
        id: 1,
        text: "Tell me about yourself.",
        category: INTERVIEW_CATEGORIES.BEHAVIORAL,
    },
    {
        id: 2,
        text: "Describe a challenge you faced in a team and how you handled it.?",
        category: INTERVIEW_CATEGORIES.BEHAVIORAL,
    },
    {
        id: 3,
        text: "If you were to find the square root of a number, how would you do it in log(n) time without any built-in functions?",
        category: INTERVIEW_CATEGORIES.TECHNICAL_DEPTH,
    },
    {
        id: 4,
        text: "What are some of the disadvantages of using a linked list over an array?",
        category: INTERVIEW_CATEGORIES.TECHNICAL_DEPTH,
    },
    {
        id: 5,
        text: "How would you find a duplicate element in an array efficiently?",
        category: INTERVIEW_CATEGORIES.TECHNICAL_DEPTH,
    },
    {
        id: 6,
        text: "How would you explain Backtracking?",
        category: INTERVIEW_CATEGORIES.TECHNICAL_DEPTH,
    },
    {
        id: 7,
        text: "Explain a technical project you built to someone without a programming background.",
        category: INTERVIEW_CATEGORIES.COMMUNICATION,
    },
    {
        id: 8,
        text: "If you were the leader of a project and one of your teammates prioritized UI over functionality, which one would you focus more on considering you have limited time and market prefers UI more?",
        category: INTERVIEW_CATEGORIES.COMMUNICATION,
    }
];

export default questions;