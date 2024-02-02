import React from "react";
import { useAuth } from "../context/authContext";

const ExampleComponent = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOutUser}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

export default ExampleComponent;
