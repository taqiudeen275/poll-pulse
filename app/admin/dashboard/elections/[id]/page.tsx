"use client";

import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";
import { getCandidates, getPosition } from "../../live-election/action";
import { getElections, getVoters } from "../action";
import { getBallots, getVotes } from "./action";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import pb from "@/utils/my_pb";
 

export default function Page({ params }: { params: { id: string } }) {
    const [candidates, setCandidate] = useState<RecordModel[]>([]);
    const [election, setElection] = useState<RecordModel>();
    const [votes, setVotes] = useState<RecordModel[]>([]);
    const [voters, setVoters] = useState<RecordModel[]>([]);
    const [positions, setPositions] = useState<RecordModel[]>([]);
    const [ballot, setBallots] = useState<RecordModel[]>([]);


    useEffect(() => {
        const fetchInitialData = async () => {
            const vresult = await getVotes();
            const vtresult = await getVoters();
            const cresult = await getCandidates();
            const eresult = await getElections()
            const presults = await getPosition()
            const bresults = await getBallots();

            setPositions(presults)
            setVotes(vresult);
            setCandidate(cresult);
            setVoters(vtresult);
            const electionqs = eresult.find(election => election.id === params.id); 
            setElection(electionqs);
            setBallots(bresults);
        }
        fetchInitialData();

    }, [params.id]);

    const getResultsForPosition = (positionId: string) => {
        // const newdata = [];
        const votesResults = votes.filter(candidatevotes => candidatevotes.position === positionId);
        
        // const candidatesResults = candidates.filter(candidate => candidate.position === positionId);
         return votesResults   
    };  
    const getBallotsForPosition = (positionId: string) =>{
        return ballot.filter(ballot => ballot.position === positionId)
    }
    const getCandidatesById = (candidateId: string) =>{
        return candidates.find(candidate => candidate.id === candidateId);
    }

    return (
        <>
        <h1 className="text-5xl">{election && election.title + "Results"}</h1>
            {positions.map(position =>(
                 <div key={position.id} className="my-6">
                 <h1 className="text-2xl">Results for {position.title} </h1>
                 <h2 className="text-lg">Total Voters:  {voters.length}</h2>
                 <h2 className="text-lg">Total Voter Turnouts:  {getBallotsForPosition(position.id).length}</h2>
                 <Table className="my-2">
                     <TableHeader>
                         <TableRow>
                             <TableHead>Candidate Photo</TableHead>
                             <TableHead>Candidate Full Name</TableHead>
                             <TableHead>Total votes</TableHead>
                             <TableHead>Percentage</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                        {getResultsForPosition(position.id).map(candidate =>(
                            <TableRow key={candidate.id}>
                             <TableCell><Image src={`${pb.fileBaseURL}${getCandidatesById(candidate.candidate)!.id}/${getCandidatesById(candidate.candidate)!.photo}`} alt={""} width={50} height={80} /> </TableCell>
                             <TableCell>{getCandidatesById(candidate.candidate) && getCandidatesById(candidate.candidate)!.full_name}</TableCell>
                             <TableCell>{candidate.ballot.length}</TableCell>
                             <TableCell>{(candidate.ballot.length / getBallotsForPosition(position.id).length) * 100}%</TableCell>
                         </TableRow>
                        ))}
                         
                     </TableBody>
                 </Table>
             </div>
     
            ))}
        </>
    )
}