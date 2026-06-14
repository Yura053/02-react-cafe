import { useState } from "react";
import css from "./App.module.css";
import type { Votes } from "../../types/votes";
import type { VoteType } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVotes(type: VoteType) {
    setVotes((votes) => ({
      ...votes,
      [type]: votes[type] + 1,
    }));
    console.log(votes);
  }

  function resetVotes() {
    setVotes({
      good: 0,
      bad: 0,
      neutral: 0,
    });
  }

  const totalVotes: number = votes.good + votes.neutral + votes.bad;
  const positiveRate: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const hideReset: boolean = totalVotes != 0 ? true : false;

  return (
    <div className={css.app}>
      <CafeInfo></CafeInfo>
      <VoteOptions
        onVote={handleVotes}
        onReset={resetVotes}
        canReset={hideReset}
      ></VoteOptions>

      {totalVotes === 0 ? (
        <Notification />
      ) : (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      )}
    </div>
  );
}

export default App;
