import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [urls, setUrls] = useState([]);
  //https://shortener-url-jxfk.onrender.com

  https: useEffect(() => {
    axios
      .get("https://shortener-url-jxfk.onrender.com/api/admin/list")
      .then((res) => setUrls(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
        📊 Admin Dashboard
      </h2>
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Short Code</th>
            <th className="p-3 text-left">Original URL</th>
            <th className="p-3 text-center">Visits</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-mono text-blue-600">{url.shortCode}</td>
              <td className="p-3 break-all">{url.originalUrl}</td>
              <td className="p-3 text-center font-semibold">
                {url.visitCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
