import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css'

function AskUsername() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const join = () => {
    const room = code.trim();
    const display = name.trim() || "Guest";
    if (!room) {
      alert("Please enter a meeting code or link.");
      return;
    }
    try {
      localStorage.setItem("displayName", display);
    } catch (e) {
      // ignore storage errors
    }
    // if user pasted a full link, extract last segment
    const extracted = room.split("/").filter(Boolean).pop();
    navigate(`/room/${extracted}`);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <section className="heroSection">
        <div className="heroEyebrow">
          <span className="eyebrowLine"></span>
          Join a meeting
          <span className="eyebrowLine"></span>
        </div>

        <h1 className="heroH1">What's your name?</h1>

        <p className="heroP">Enter a display name and the meeting code or link to join.</p>

        <div style={{ display: 'flex', gap: 12, flexDirection: 'column', alignItems: 'center', marginTop: 18 }}>
          <input
            className="joinInput"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: 360 }}
          />

          <input
            className="joinInput"
            placeholder="Meeting code or link"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: 360 }}
          />

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="joinGo ctaMain" onClick={join}>Join →</button>
            <button className="ctaSec" onClick={() => { setName(''); setCode(''); }}>Clear</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AskUsername;
