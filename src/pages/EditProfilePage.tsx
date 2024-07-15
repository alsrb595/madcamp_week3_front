import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './EditProfilePage.css';

function EditProfilePage() {
  const { isLoggedIn, userEmail, userGoogleId, userDisplayName, userProfileImage, changeDisplayName, changeUserProfileImage } = useAuth();
  const navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState<string>(userDisplayName);
  const [newProfileImage, setNewProfileImage] = useState<string>(userProfileImage);

  const handleSave = () => {
    changeDisplayName(newDisplayName);
    changeUserProfileImage(newProfileImage);
    navigate('/profile');
  };

  if (isLoggedIn) {
    return (
      <div className="profile-card">
        <h1>{userDisplayName}</h1>
        <img className="profile-image" src={userProfileImage} alt="Profile" />
        <div>
          <label>
            닉네임:
            <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            프로필 이미지 URL:
            <input type="text" value={newProfileImage} onChange={(e) => setNewProfileImage(e.target.value)} />
          </label>
        </div>
        <p>Google ID: {userGoogleId}</p>
        <p>Email: {userEmail}</p>
        <button className="edit-button" onClick={handleSave}>저장하기</button>
      </div>
    );
  } else {
    return (
      <div className="login-prompt">
        <h1>로그인 해주세요</h1>
        <h2>프로필 수정은 로그인 후 가능합니다.</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }
}

export default EditProfilePage;
