import React, { useState } from "react";
import Login from "./Login";

export default function User() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    //localStorage.setItem("userToken", userData.token); 
    console.log("Usuario autenticado:", userData);
  };

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <h1>Bienvenido, {user.name}!</h1>
      )}
    </div>
  );
};