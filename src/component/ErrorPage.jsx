import React from 'react';

const ErrorPage = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-red-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-2">Server ErrorPage</h2>
            <p className="text-lg">{message || "Something went wrong. Please try again later."}</p>
          </div>
        </div>
      );
};

export default ErrorPage;

