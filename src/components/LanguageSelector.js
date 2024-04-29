import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const LanguageSelector = ({ language, onSelect }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const ACTIVE_COLOR = "blue";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={{ marginLeft: "8px", marginBottom: "16px" }}>
      <div style={{ marginBottom: "8px", fontSize: "1.125rem" }}>Language:</div>
      <div style={{ position: "relative" }}>
        <button
          style={{
            padding: "8px",
            backgroundColor: "#4A5568",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={toggleDropdown}
        >
          {language}
        </button>
        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#1A202C",
              borderRadius: "4px",
              zIndex: 1,
            }}
          >
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                style={{
                  padding: "8px",
                  color: lang === language ? ACTIVE_COLOR : "inherit",
                  backgroundColor: lang === language ? "#2D3748" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onSelect(lang);
                  toggleDropdown(); // Close dropdown on selection
                }}
              >
                {lang} <span style={{ color: "#718096", fontSize: "0.75rem" }}>({version})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
