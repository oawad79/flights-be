import { Router } from 'express';
import flights from "./flights.routes";

const router = Router();

router.use('/flights', flights);

export default router;