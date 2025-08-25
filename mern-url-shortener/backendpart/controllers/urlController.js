import Url from "../models/urlModel.js";

// helper function
const generateShortCode = () => Math.random().toString(36).substring(2, 8);

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  console.log("reciverd lonul:",req.body)
  try {
    // check if exists
    let existing = await Url.findOne({ originalUrl: longUrl });
    if (existing) {
      return res.status(200).json({
        shortUrl: `${req.protocol}://${req.get("host")}/${existing.shortCode}`,
      });
    }

    // create new
    const shortCode = generateShortCode();
    const newUrl = new Url({ originalUrl: longUrl, shortCode });
    await newUrl.save();

    res.status(201).json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortcode } = req.params;
//   console.log(req.params)
  try {
    const urlEntry = await Url.findOne({ shortCode: shortcode });
    if (!urlEntry) return res.status(404).json({ error: "URL not found" });

    urlEntry.visitCount += 1;
    await urlEntry.save();
    res.redirect(urlEntry.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving URL" });
  }
};

// (Bonus) admin list
export const listUrls = async (req, res) => {
     
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Error fetching URLs" });
  }
};
