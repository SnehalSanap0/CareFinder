import React from 'react';
import CaretakerGrid from './CaretakerList'; // Make sure this path is correct

function CaretakersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Caretakers</h1>
        <CaretakerGrid />
      </div>
    </div>
  );
}

export default CaretakersPage;