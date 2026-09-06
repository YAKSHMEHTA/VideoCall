import React, { useState, useRef, useEffect } from "react";
import { connect, io } from "socket.io-client";
import "../Pages/Landing.css";

function VideoPage() {
  const serverUrl = "localhost:8000";
  const peerConfigConnections = {
    iceServers: [{ urls: "stun.12connect.com:3478" }],
  };

  const socketIdRef = useRef(null);
  const localVideoRef = useRef();
  const socketRef = useRef(null);
  const [videoPermission, setVideoPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState(null);
  const [screen, setScreen] = useState();
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState(null);
  const [newMessage, setNewMessage] = useState(0);
  const [askUsername, setAskUsername] = useState(true);
  const [userName, setUserName] = useState("");
  const videoRef = useRef([]);
  const [videos, setVideos] = useState([]);

  const getPermissions = async () => {
    const cameraPermission = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    if (cameraPermission) {
      setVideoPermission(true);
    } else {
      setVideoPermission(false);
    }
    const micPermission = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    if (micPermission) {
      setAudioPermission(true);
    } else {
      setAudioPermission(false);
    }
    if (cameraPermission || micPermission) {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (userMediaStream) {
        window.localStream = userMediaStream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = userMediaStream;
        }
      }
    }
  };

  const gotMessageFromServer = (fromId, message) => { };

  const connectToSocket = () => {
    socketRef.current = io.connect(serverUrl, { secure: false });
    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);
      socketIdRef.id = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);
      socketRef.current.on("user-left", (id) => {
        setVideo((videos) => video.filter((video) => video.socketId !== id));
      });
    });

    socketRef.current.on("user-joined", (id, clients) => {
      clients.forEach((socketListId) => {
        connections[socketListId] = new RTCPeerConnection(
          peerConfigConnections,
        );

        connecttions[socketListId].onicecandidate = (event) => {
          if (event.candidate !== null) {
            socketRef.current.emit(
              "signal",
              socketListId,
              JSON.stringify({ ice: event.candidate }),
            );
          }
        };
      });
    });
  };

  const getMedia = () => {
    setVideo(videoPermission);
    setAudio(audioPermission);
    console.log("connect called");
    connectToSocket();
  };

  getPermissions();

  // useEffect(()=>{
  //   // if user already entered a display name earlier, skip the prompt
  //   try{
  //     const existing = localStorage.getItem("displayName");
  //     if(existing){
  //       setUserName(existing);
  //       setAskUsername(false);
  //     }
  //   }catch(e){}
  //   getPermissions();
  // },[])

  // if(!isChrome){

  // }

  const getUserMediaSucccess = (stream) => { };

  const getUserMedia = () => {
    if ((video && videoPermission) || (audio && audioPermission)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(() => { })
        .then(() => { })
        .catch((e) => {
          console.log(e);
        });
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  const handleJoin = () => {
    const display = userName.trim() || "Guest";
    getMedia();
    try {
      localStorage.setItem("displayName", display);
    } catch (e) { }
    setAskUsername(false);
  };

  return (
    <div className="z-50">
      {askUsername ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            zIndex: 60,
          }}
        >
          <div
            style={{
              width: 920,
              maxWidth: "96%",
              background: "var(--bg)",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div
                style={{
                  flex: "0 0 360px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{
                    width: 320,
                    height: 180,
                    background: "#000",
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
                <div style={{ fontSize: "0.9rem", color: "var(--sub)" }}>
                  This is your camera preview
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, marginBottom: 8 }}>
                  Enter your display name
                </h2>
                <p style={{ marginTop: 0, color: "var(--sub)" }}>
                  Others in the meeting will see this name.
                </p>
                <input
                  className="joinInput"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ width: "100%", marginTop: 12 }}
                />

                <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
                  <button className="joinGo ctaMain" onClick={handleJoin}>
                    Join meeting
                  </button>
                  <button
                    className="ctaSec"
                    onClick={() => {
                      setUserName("");
                      try {
                        localStorage.removeItem("displayName");
                      } catch (e) { }
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* rest of VideoPage UI goes here */}
    </div>
  );
}

export default VideoPage;
