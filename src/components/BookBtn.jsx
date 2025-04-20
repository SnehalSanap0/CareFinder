import { useAuth } from "../AuthContext";
import { useState } from "react";

function BookButton({ caregiverId }) {
    const { token, userId } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleBookClick = async () => {
        try {
            if (!userId) {
                throw new Error("User ID is not available. Please log in again.");
            }

            if (!caregiverId) {
                throw new Error("Caregiver ID is not available.");
            }

            setIsLoading(true);
            setError(null);

            const res = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    caregiverId: caregiverId,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Booking created:', data);
            // You might want to show a success message to the user here
        } catch (error) {
            console.error('Error creating booking:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && (
                <div className="mb-2 text-red-600 text-sm">
                    {error}
                </div>
            )}
            <button 
                className={`w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={handleBookClick}
                disabled={isLoading}
            >
                {isLoading ? 'Booking...' : 'Book'}
            </button>
        </div>
    );
}

export default BookButton;