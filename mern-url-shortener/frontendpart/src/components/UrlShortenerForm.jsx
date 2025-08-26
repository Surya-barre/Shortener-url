import React, { useState } from "react";
import axios from "axios";

export default function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    //https://shortener-url-jxfk.onrender.com
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error("Error shortening URL:", err);
      alert(err.response?.data?.error || "Server error");
    }
  };

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
            className="text-blue-600 underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
