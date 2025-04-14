import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch scores from the backend
    setLoading(true);
    axios
      .get("/api/scores")
      .then((response) => {
        setScores(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Leaderboard">
      <h2>Leaderboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {scores.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Score</th>
              <th>WPM</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{score.score}</td>
                <td>{score.wpm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;