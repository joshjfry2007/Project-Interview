import { Router } from "express";
import { questions, INTERVIEW_CATEGORY_LIST} from "../data/questions.js"

const router  = Router();

router.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        categories : INTERVIEW_CATEGORY_LIST,
        questions
    });
});

export default router;