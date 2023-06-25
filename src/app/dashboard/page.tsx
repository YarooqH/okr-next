"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useQuery } from "react-query";
import { User } from "@prisma/client";
import Link from "next/link";


function Index() {
  const { user } = useUser();
  const [leaderBoardLoader, setLeaderBoardLoader] = useState(true);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [userData, setUserData] = useState<User>();
  const [userLoader, setUserLoader] = useState(true);

  // const { isLoading, error, data, isFetching } = useQuery({
  //   queryKey: ["leaderboardData"],
  //   queryFn: () => axios.get("/api/leaderboard").then((res) => res.data),
  // });

  useEffect(() => {
    (async () => {
      let res = await axios.post("/api/user", {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.username,
      });
      // console.log("myRes", res);
      setUserData(res?.data);
      setUserLoader(false)

    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      let res = await axios.get("/api/leaderboard");
      setLeaderBoard(res?.data);
      setLeaderBoardLoader(false);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full lg:flex-row p-2">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
          {leaderBoardLoader ? (
            <span className="loading loading-infinity loading-lg"></span>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderBoard?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item?.name}</td>
                        <td>{item?.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
          {userLoader ? (
            <span className="loading loading-infinity loading-lg"></span>
          ) : (
            <div className="stat flex flex-col items-center justify-center">
              <div className="stat-title">Your Score</div>
              <div className="stat-value">{userData?.highestPoints} - Highest Score</div>
              <div className="stat-value">{userData?.totalPoints} - All Time Score</div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[100%] mt-5 flex items-center justify-center">
        <Link href='/quiz'>
          <button className="btn btn-block">Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default Index;
