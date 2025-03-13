'use client'
import React, { useEffect, useState } from 'react';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch reviews from the API using fetch
    fetch('http://localhost:8000/review/api/reviews/list/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching reviews');
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setReviews(data); // Store reviews in state
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Set error message if something goes wrong
        setLoading(false);
      });
  }, []);

  // Display loading state or error message
  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>Name:{review.user_name}</h3>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.review_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
