import {randomUUID} from "crypto";

export const sessions = new Map();

export function createSession() {
    const session = {
        id: randomUUID(),
        createdAt : new Date.now().toISOString(),
        answers : [],
    };

    sessions.set(session.id, session);

    return sessions;
}