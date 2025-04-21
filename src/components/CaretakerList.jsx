import React from 'react';
import { Star, Heart, MessageCircle, Calendar } from 'lucide-react';

// Sample data - in a real app, this would come from props or an API
const caretakers = [
  {
    id: 1,
    name: "Sarah Johnson",

    rating: 4.8,
    reviews: 152,
    hourlyRate: 25,
    experience: "5+ years",
    specialties: ["Elderly Care", "Medication Management"],
    availability: "Weekdays",
    imageUrl: "/api/placeholder/200/200",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Certified Nursing Assistant",
    rating: 4.9,
    reviews: 98,
    hourlyRate: 28,
    experience: "7+ years",
    specialties: ["Post-Surgery Care", "Physical Therapy"],
    availability: "Evenings & Weekends",
    imageUrl: "/api/placeholder/200/200",
  },
  {
    id: 3,
    name: "Jessica Patel",
    title: "Home Health Aide",
    rating: 4.7,
    reviews: 64,
    hourlyRate: 22,
    experience: "3+ years",
    specialties: ["Child Care", "Special Needs"],
    availability: "Flexible",
    imageUrl: "/api/placeholder/200/200",
  }
];

// Single Caretaker Card component
const CaretakerCard = ({ caretaker }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col w-64">
      {/* Image section */}
      <div className="relative">
        <img 
          src={caretaker.imageUrl} 
          alt={caretaker.name} 
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100">
          <Heart size={18} className="text-gray-500 hover:text-red-500" />
        </button>
      </div>
      
      {/* Content section */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center mb-1">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-semibold">{caretaker.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({caretaker.reviews} reviews)</span>
        </div>
        
        <h3 className="font-bold text-lg mb-1">{caretaker.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{caretaker.title}</p>
        
        <div className="mb-2">
          <span className="text-lg font-bold text-blue-700">${caretaker.hourlyRate}</span>
          <span className="text-gray-600 text-sm">/hour</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-2">Experience: {caretaker.experience}</p>
        
        <div className="mb-3">
          <p className="text-xs font-semibold mb-1">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {caretaker.specialties.map((specialty, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{caretaker.availability}</span>
        </div>
      </div>
      
      {/* Actions section */}
      <div className="p-4 border-t">
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center">
            <MessageCircle size={16} className="mr-1" />
            Message
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Caretaker Grid Component
export default function CaretakerGrid() {
  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Available Caretakers</h2>
      <div className="flex flex-wrap gap-6">
        {caretakers.map(caretaker => (
          <CaretakerCard key={caretaker.id} caretaker={caretaker} />
        ))}
      </div>
    </div>
  );
}