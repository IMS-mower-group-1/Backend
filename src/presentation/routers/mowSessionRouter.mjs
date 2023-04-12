import express from "express"
import { ValidationError } from '../../utils/errors.mjs';

export default function createMowSessionRouter({mowSessionService}) {

    const router = express.Router();


    // Get all mow sessions for mower by mower-id
    router.get("/mower/:id", async (req, res) => {
        const mowerId = req.params.id 
        try {
            const mowSessions = await mowSessionService.getAllMowSessionsByMowerId(mowerId)
            res.status(200).json(mowSessions)
        } catch (error) {
            console.error(error)
            if(error instanceof ValidationError){
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error: 'An internal server error occurred.'})
            }
        }
    });

    // Get active mow session by mower-id
    router.get("/mower/:id/active", async (req, res) => {
        const mowerId = req.params.id 
        try {
            const activeMowSession = await mowSessionService.getActiveMowSessionByMowerId(mowerId)
            res.status(200).json(activeMowSession)
        } catch (error) {
            console.error(error)
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An internal server error occurred.' });
            }
        }
    });

    router.post("/start-session/:id", async (req, res) => {
        const mowerId = req.params.id;
        try {
            const mowSessionId = await mowSessionService.startMowSessionByMowerId(mowerId);
            res.status(201).json({ message: 'Mowing session started successfully', mowSessionId });
        } catch (error) {
            console.error(error)
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An internal server error occurred.' });
            }
        }
    });

    router.post("/end-session/:id", async (req, res) => {
        const mowerId = req.params.id
        try {
            await mowSessionService.endMowSessionByMowerId(mowerId)
            res.status(200).json({ message: 'Mowing session ended successfully' });
        } catch (error) {
            console.error(error)
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An internal server error occurred.' });
            }
        }
    });
    return router
}
