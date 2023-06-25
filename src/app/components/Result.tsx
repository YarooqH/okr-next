'use client'
import React, {useEffect} from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const Result = ({ score }) => {
  const {user} = useUser();
  useEffect(() => {
    (async () => {
      await axios.post('/api/leaderboard', {
        email: user?.primaryEmailAddress?.emailAddress,
        points: score
      })
    })()
  }, [user, score])
  return (
    <div>
      <div className="stat place-items-center">
        <div className="stat-value">{score}</div>
        <div className="stat-title text-lg">Your Result</div>
        <Link href="/dashboard" >
          <button className="btn mt-3">Go to Dashboard</button>
        </Link>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>
      {/* <h2>Quiz Result</h2>
      <p>Your score: {score}</p> */}
    </div>
  );
};

export default Result;
