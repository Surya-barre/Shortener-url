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
      const res = await axios.post("http://localhost:5000/api/shorten", {
        longUrl,
      });
      setShortUrl(res.data.shortUrl);
      setLongUrl("");
    } catch (err) {
      console.error("Error shortening URL:", err);
      alert(err.response?.data?.error || "Server error");
    }
  };

  // ⏳ Check after 30 seconds
  useEffect(() => {
    if (shortUrl) {
      const timer = setTimeout(() => {
        if (!clicked) {
          setShowPopup(true);
        }
      }, 10000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [shortUrl, clicked]);

  // 🔗 Handle link click
  const handleLinkClick = () => {
    setClicked(true);
    window.location.reload(true); // Refresh after clicking
  };

  // ❌ If popup shows and user ignores, reload after 10s
  useEffect(() => {
    if (showPopup && !clicked) {
      const reloadTimer = setTimeout(() => {
        if (!clicked) {
          window.location.reload(true);
        }
      }, 5000); // wait 10s after popup before reload
      return () => clearTimeout(reloadTimer);
    }
  }, [showPopup, clicked]);

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        🔗 URL Shortener
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
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
            <h3 className="text-lg font-bold mb-4">⚠️ Reminder</h3>
            <p className="mb-4">
              You haven’t clicked the link yet. Do you want to open it?
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              No, Stay
            </button>
            <button
              onClick={() => {
                window.location.reload(true);
              }}
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
