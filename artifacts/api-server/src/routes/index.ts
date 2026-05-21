import { Router, type IRouter } from "express";
import healthRouter from "./health";
import breedsRouter from "./breeds";
import analyzeRouter from "./analyze";

const router: IRouter = Router();

router.use(healthRouter);
router.use(breedsRouter);
router.use(analyzeRouter);

export default router;
