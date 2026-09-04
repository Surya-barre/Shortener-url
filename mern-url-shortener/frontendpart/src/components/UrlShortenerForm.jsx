import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://shortener-url-jxfk.onrender.com/api/shorten",
        {
          longUrl,
        }
      );

      setShortUrl(res.data.shortUrl);
      setLongUrl("");
      setClicked(false);
      setShowPopup(false);
    } catch (err) {
      console.error("Error shortening URL:", err);
      alert(err.response?.data?.error || "Server error");
    }
  };

  // Check after 10 seconds
  useEffect(() => {
    if (shortUrl) {
      const timer = setTimeout(() => {
        if (!clicked) {
          setShowPopup(true);
        }
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [shortUrl, clicked]);

  // Handle short link click
  const handleLinkClick = () => {
    setClicked(true);
    setShowPopup(false);
  };

  // Reload page if popup is ignored for 5 seconds
  useEffect(() => {
    if (showPopup && !clicked) {
      const reloadTimer = setTimeout(() => {
        if (!clicked) {
          window.location.reload();
        }
      }, 5000);

      return () => clearTimeout(reloadTimer);
    }
  }, [showPopup, clicked]);

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        🔗 URL Shortener
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
          <p className="font-semibold">✅ Shortened URL:</p>

          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="text-blue-600 underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}

      {showPopup && !clicked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h3 className="text-lg font-bold mb-4">
              ⚠️ Reminder
            </h3>

            <p className="mb-4">
              You haven’t clicked the link yet. Do you want to open it?
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              No, Stay
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Reload Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
