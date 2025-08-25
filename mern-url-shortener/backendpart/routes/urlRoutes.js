import express from "express";
import {
  shortenUrl,
  redirectUrl,
  listUrls,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/admin/list", listUrls); // optional admin route
router.get("/:shortcode", redirectUrl);

export default router;
