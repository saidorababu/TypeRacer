import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = ({username,email}) => {
  const navigate = useNavigate(); // Hook from react-router-dom to navigate programmatically
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://imgs.search.brave.com/xkauigvFo8pS5F0fV-ciVGwBiXeWqK97dhxLMWVD4mY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzgzLzkwLzk1/LzM2MF9GXzQ4Mzkw/OTU2M19CdXB4MGsx/TnFkejJ0WFBzNzhz/ZW1IM0lvR0VqZWhn/Ri5qcGc" // Placeholder profile image
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{username}</h2>
        <p className="profile-email">{email}</p>
        <button className="edit-btn">Edit Profile</button>

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Profile;
