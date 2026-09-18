import { Router } from "express";
import { TestGenerationService } from "../services/testGenerationService.js";
import { HealingService } from "../services/healingService.js";

const router = Router();

const service = new TestGenerationService();
const healingService = new HealingService();

router.post("/generate-tests", async (req, res) => {

  try {

    const { requirement } = req.body;

    const result =
      await service.generate(requirement);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error"
    });
  }
});

router.post("/heal-test", async (req, res) => {
  try {
    const { script, failure, context } = req.body;
    const result = await healingService.heal(script, failure, context);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;