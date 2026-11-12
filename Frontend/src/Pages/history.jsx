import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function history() {
	const { getUserHistory } = useContext(AuthContext);
	const [meetings, setMeetings] = useState([]);
	const routeTo = useNavigate();

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const history = await getUserHistory();
				setMeetings(history);
			} catch (error) {
				console.log(error);
			}
		};
		fetchHistory();
	}, []);

	return <div></div>;
}

export default history;
