export async function evaluateAnswer(prompt, answer) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        scores: {
            clarity: Math.floor(Math.random() * 11),
            correctness: Math.floor(Math.random() * 11),
            confidence: Math.floor(Math.random() * 11)
        },
        followUp: "Can you give a specific example of that?",
        evidence: [
            {
                quote: answer.trim().slice(0, 120),
                comment: "Demo evidence based on the submitted answer."
            }
        ]
    };
}