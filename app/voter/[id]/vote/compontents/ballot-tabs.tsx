"use client";

import Image from "next/image";
import { Tabs } from "./tabs";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { useRouter } from "next/navigation";
import { createBallot, getBallot, getCandidates, getElection, getPositions, getVotPermit } from "../action";
import pb from "@/utils/my_pb";
import { Button } from "@/components/ui/button";
import { Verified, Vote, VoteIcon } from "lucide-react";
import Countdown from "./voteCountDown";
import { TypewriterEffectSmooth } from "@/app/ui/typewriter-effect";


export function BallotTabs({ id }: any) {
  const [voters, setVoters] = useState<RecordModel[]>([]);
  const [candidates, setCandidate] = useState<RecordModel[]>([]);
  const [election, setElection] = useState<RecordModel>();
  const [permit, setPermit] = useState<RecordModel>();
  const [positions, setPositions] = useState<RecordModel[]>([]);
  const [myBallot, setmyBallot] = useState<RecordModel[]>([]);
  const [key, setKey] = useState(0); // A

  const route = useRouter();



  useEffect(() => {
    const fetchInitialData = async () => {
      const permit = await getVotPermit(id)
      const rpositions = await getPositions()
      const ballots = await getBallot(permit?.id)
      setElection(await getElection())
      setPermit(permit)
      setCandidate(await getCandidates())

      if (ballots.length > 0) {
        // 2. Filter positions to remove positions which the ballot already exists
        const updatedPositions = rpositions.filter(
          (pos) => !ballots.some((ballot) => ballot.position === pos.id)
        );

        // 3. Set positions in the setState to the filtered positions
        setPositions(updatedPositions);
      } else {
        setPositions(rpositions);
      }
      setmyBallot(ballots);

    }
    fetchInitialData();

  }, [id, key]);

  function getCandidatesByPosition(pos_id: string) {
    return candidates.filter(candidate => candidate.position === pos_id);
  }


  const handleCandidateClick = async (candidateId: string, positionId: string, skipped: boolean= false) => {
    const record = await createBallot({
      permit: permit?.id,
      election: election?.id,
      candidate: skipped? "": candidateId,
      position: positionId,
      skipped: skipped
    })
    if (record.id) {
      console.log("Record ----------", record)
      const updatedPositions = positions.filter((pos) => pos.id !== positionId)
      setPositions(updatedPositions)
      const updatedCandidates = candidates.filter((candidate) => candidate.id !== candidateId)
      setCandidate(updatedCandidates)
      setKey((prevKey) => prevKey + 1);

    }
  };
  return (
    <div className="h-[80vh] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-3">
      <h1 className="sm:text-3xl text-2xl my-2 mx-3 text">{election?.title}</h1>
      {positions.length > 0 && <Tabs key={key} tabs={positions.map((pos) => (
        {
          title: pos.title,
          value: pos.id,
          content: (
            <div className="w-full overflow-x-auto relative h-full rounded-2xl p-6 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
              <p>{pos.title}</p>
              <p className="text-sm">Democracy in Action: Cast Your Ballot</p>

              <Content candidate={getCandidatesByPosition(pos.id)} onCandidateClick={handleCandidateClick} positionId={pos.id} />
              
            </div>
          )
        }
      ))} />}
      {positions.length === 0 && election?.id && <div className="h-full w-full flex justify-center items-center">
        <div className="text-center">
          <TypewriterEffectSmooth words={[
            {
              text: "Thank",
              className: "text-sm",
            },
            {
              text: "you",
              className: "text-sm",
            },
            {
              text: "for",
              className: "text-sm",
            },
            {
              text: "voting",
              className: "text-sm text-blue-500 dark:text-blue-500",
            },
            ]} />
          <p>Election will end</p>
          <Countdown targetTime={election?.end_at} />
          <p>Results will be declared by the EC after the election.</p>
        </div>
      </div>}
    </div>
  );
}

const Content = ({ candidate, onCandidateClick, positionId }: any) => {

  return (
    <div className="text-sm flex overflow-x-auto flex-wrap justify-center gap-2 items-center mt-4 mb-72 sm:mb-auto">
      {candidate.map((can: { id: Key | null | undefined; photo: any; full_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; slogan: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (<div key={can.id} className="border p-5 rounded-2xl w-60 space-y-1 hover:scale-105 transition-transform ">
        <Image src={`${pb.fileBaseURL}${can.id}/${can.photo}`} alt="" width={200} height={150} className="aspect-square object-cover rounded-2xl " />
        <div className="text-lg">{can.full_name}</div>
        <div className="text-sm italic font-thin">{can.slogan}</div>
        
        {candidate.length > 1 ? <Button className="bg-be-700 hover:bg-blue-900" onClick={() => onCandidateClick(can.id, positionId)}>Vote <Verified className="ml-2" /></Button>:  <div className="flex gap-2">
          <Button className="bg-be-700 hover:bg-blue-900" onClick={() => onCandidateClick(can.id, positionId, false)}>Yes <Verified className="ml-2" /></Button>
          <Button className="bg-be-700 hover:bg-blue-900" onClick={() => onCandidateClick("101010", positionId, true)}>No <Verified className="ml-2" /></Button>
          </div>}
      </div>))}
      <div >

      </div>

    </div>
  );
};
