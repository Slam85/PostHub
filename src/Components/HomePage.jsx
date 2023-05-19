import React, { useState } from "react";
import HomePage from "../Components/HomePage";
import ProfilePage from "../Components/ProfilePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <ProfilePage userId={userId} onLogout={handleLogout} />
      ) : (
        <HomePage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
