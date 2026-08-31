import React, { useState, useRef, useEffect } from "react";

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
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [screen, setScreen] = useState();
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState(null);
  const [newMessage, setNewMessage] = useState(0);
  const [askUsername, setAskUsername] = useState(true);
  const [userName, setUserName] = useState("");
  const videoRef = useRef([]);
  const [videos, setVideos] = useState([]);

  const getPermissions = async()=>{
    const cameraPermission = await navigator.mediaDevices.getUserMedia({video:true});
    if(cameraPermission){
      setVideoPermission(true);
    }else{
      setVideoPermission(false);
    }
    const micPermission = await navigator.mediaDevices.getUserMedia({audio:true});
    if(micPermission){
      setAudioPermission(true);
    }else{
      setAudioPermission(false);
    }
    if(cameraPermission || micPermission){
      const userMediaStream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
      if(userMediaStream){
        window.localStream = userMediaStream;
        if(localVideoRef.current){
          localVideoRef.current.srcObject = userMediaStream;
        }
      }
    }
  }

  useEffect(()=>{
    getPermissions();
  },[])

  // if(!isChrome){

  // }

  return (
    <div className="z-50  ">
      {askUsername === true ? (
        <div>
          <input type="text" placeholder="Enter your username" />
          <video src="" ref={localVideoRef} autoPlay muted/>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default VideoPage;
