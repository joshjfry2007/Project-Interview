export async function submitAnswer(question, answer) {
    await new Promise((r) => setTimeout(r, 1000));
    return {
        scores: { clarity: Math.floor(Math.random() * 11), correctness: Math.floor(Math.random() * 11), confidence: Math.floor(Math.random() * 11) },
        followUp: "Can you give a specific example of that?",
        evidence: [ { quote: "...", comment: "..." } ]
    }
}