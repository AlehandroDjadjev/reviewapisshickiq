'use client'
import { useState } from "react";

export default function ReviewForm() {
    const [formData, setFormData] = useState({
        user_name: "",
        rating: "",
        review_text: ""
    });
    
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        
        try {
            const response = await fetch("http://127.0.0.1:8000/review/api/reviews/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                setMessage("Review submitted successfully!");
                setFormData({ user_name: "", rating: "", review_text: "" });
            } else {
                setMessage("Failed to submit review. Please try again.");
            }
        } catch (error) {
            setMessage("Failed to submit review. Please try again.");
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
            <div style={{ width: "100%", maxWidth: "400px", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px" }}>Submit a Review</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="user_name"
                        placeholder="Username"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating (1-5)"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        min="1"
                        max="5"
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                    <textarea
                        name="review_text"
                        placeholder="Write your review..."
                        value={formData.review_text}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px", height: "100px" }}
                    />
                    <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Submit</button>
                </form>
                {message && <p style={{ marginTop: "10px", textAlign: "center", color: "#374151" }}>{message}</p>}
            </div>
        </div>
    );
}
