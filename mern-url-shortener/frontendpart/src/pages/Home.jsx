import React from "react";
import UrlShortenerForm from "../components/UrlShortenerForm";
import AdminPage from "../components/AdminPage";
 
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        🚀 Simple URL Shortener
      </h1>
      <UrlShortenerForm />
      <AdminPage/>
    </div>
  );
};

export default Home;
