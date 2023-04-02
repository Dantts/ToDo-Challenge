import React from "react";

import "./styles.scss";
import { useAuth } from "../../contexts/useAuth.context";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const { user, signOut } = useAuth();
  return (
    <header className="header">
      <div>
        <img src="/logo.svg" alt="to.do" />
        <div className="logout">
          <p style={{ textAlign: "end" }}>{user?.name}</p>
          <FiLogOut
            size={32}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={signOut}
          />
        </div>
      </div>
    </header>
  );
};
