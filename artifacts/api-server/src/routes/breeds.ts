import { Router, type IRouter } from "express";
import {
  ListBreedsQueryParams,
  GetBreedParams,
} from "@workspace/api-zod";
import { breedsData, filterBreeds, getBreedById } from "../lib/breeds-data";

const router: IRouter = Router();

router.get("/breeds", async (req, res): Promise<void> => {
  const parsed = ListBreedsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { species, purpose, conservationStatus } = parsed.data;
  const breeds = filterBreeds(species, purpose, conservationStatus);
  res.json(breeds);
});

router.get("/breeds/:id", async (req, res): Promise<void> => {
  const parsed = GetBreedParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const breed = getBreedById(parsed.data.id);
  if (!breed) {
    res.status(404).json({ error: "Breed not found" });
    return;
  }

  res.json(breed);
});

router.get("/stats", async (_req, res): Promise<void> => {
  const total = breedsData.length;
  const cattle = breedsData.filter((b) => b.species === "Cattle").length;
  const buffalo = breedsData.filter((b) => b.species === "Buffalo").length;
  const endangered = breedsData.filter(
    (b) => b.conservationStatus === "Endangered",
  ).length;
  const states = new Set(breedsData.map((b) => b.state)).size;

  res.json({
    totalBreeds: total,
    cattleCount: cattle,
    buffaloCount: buffalo,
    endangeredCount: endangered,
    statesCovered: states,
    accuracyRate: "95%+",
  });
});

export default router;
