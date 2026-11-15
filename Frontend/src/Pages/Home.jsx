import React, { useState } from "react";
import { useEffect } from "react";
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap')`;
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {

	const [code,setCode] = useState(null);
	const navi = useNavigate();

	const handleJoin = ()=>{
		navi(`/room/${code}`);
	}


	return (

			<div className="finalCta absolute z-50 top-0 h-full w-full ">
				<h2 className="">
					Stop scheduling.
					<br />
					Start <em>meeting.</em>
				</h2>
				<p className=" d1">Free for small teams. No credit card. Up and running in 60 seconds.</p>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }} className=" d2">
					<div className="joinInline">
						<input onChange={(e)=> setCode(e.target.value)} className="joinInput" type="text" placeholder="Enter a meeting code or link…" />
						<button onClick={handleJoin} className="joinGo">Join →</button>
					</div>
					<span style={{ fontSize: "0.75rem", color: "var(--sub)" }}>or</span>
					<button className="ctaMain" style={{ padding: "13px 32px" }}>
						Create a new meeting
					</button>
				</div>
			</div>

	);
}

export default Home;
