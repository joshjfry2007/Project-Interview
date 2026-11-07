import { Router } from "express";
import { randomUUID } from "node:crypto";

import { createSession, sessions } from "../store/sessionStore.js";
import { questions } from "../data/questions.js";
import { evaluateAnswer } from "../services/evaluateAnswer.js";
import { validateBody } from "../middleWare/validateBody.js";
import { createSessionSchema, submitAnswerSchema } from "../validators/sessionSchemas.js";

const router = Router();


router.post("/", validateBody(createSessionSchema), (req, res) => {
    const session = createSession();

    res.status(201).json({
        success: true,
        session
    });
});


router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        sessions: [...sessions.values()]
    });
});


router.post("/:id/answers", validateBody(submitAnswerSchema), async (req, res, next) => {
    try {
        const session = sessions.get(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found."
            });
        }

        const { questionId, prompt, answer } = req.body;

        const question = questions.find((q) => q.id === questionId);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found."
            });
        }

        const feedback = await evaluateAnswer(prompt, answer);

        const entry = {
            id: randomUUID(),
            questionId,
            question: prompt,
            answer,
            category: question.category,
            feedback,
            createdAt: new Date().toISOString()
        };

        session.answers.push(entry);

        res.status(201).json({
            success: true,
            entry
        });

    } catch (err) {
        next(err);
    }
});

export default router;