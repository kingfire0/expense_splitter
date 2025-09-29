import React from "react";

export default function Header({ onCreateGroup, onLogoClick }) {


  return (
    <header className="header">
      <h1 className="logo" onClick={onLogoClick}>
        Split Sqaure
      </h1>
      <div className="row gap">
       
        <button className="btn" onClick={onCreateGroup}>
          Create Group
        </button>
      </div>
    </header>
  );
}
