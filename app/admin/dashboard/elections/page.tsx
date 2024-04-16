'use client'
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createElectionPermit, createVoterUser, getElections, getVoters, getVotersPermit, updateElection } from "./action";
import { RecordModel } from "pocketbase";
import { Button } from "@/components/ui/button";
import { Circle, CircleDot, Triangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";

export default function ElectionPage() {
    const [elections, setElections] = useState<RecordModel[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const route = useRouter();

    useEffect(() => {
        const fetchElections = async () => {
            const response = await getElections();
            setElections(response);
        }
        fetchElections();

    }, []);
    function generateRandomCode() {
        const numbers = Math.floor(10000  + Math.random() * 9000);
        const letters = String.fromCharCode(
            65 + Math.floor(Math.random() * 26),
            65 + Math.floor(Math.random() * 26),
            65 + Math.floor(Math.random() * 26)
        );
        return `${letters}${numbers}`;
    }

    function formatVoterDataList(votersPermitList: RecordModel[], votersList: RecordModel[]) {
        const formattedList = [];
        for (const votersPermit of votersPermitList) {
            const voter = votersList.find(v => v.id === votersPermit.voter);
            if (voter) {
                formattedList.push({
                    name: voter.full_name,
                    email: voter.email,
                    permit: votersPermit.election_permit_code,
                });
            }
        }

        return formattedList;
    }

    async function handleStartElection() {
        setIsLoading(true)
        const voters = await getVoters()
        const election = elections.find(election => election.archive === false)
        voters.forEach(voter => {
            if (election) {
                const code = generateRandomCode()
                createElectionPermit({
                    voter: voter.id,
                    election: election.id,
                    election_permit_code: code, 
                    expired_at: election.end_at,
                    voted: false,
                })
                createVoterUser({
                    username: voter.student_id,
                    password: code,
                    passwordConfirm: code,
                    verified: true,

                })

            }
        });

        const voters_permit = await getVotersPermit()

        const votersData = formatVoterDataList(voters_permit, voters)

        const respond = await fetch("/api/admin/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ permit: votersData })
        })

        const data = await respond.json()
        console.log("STATUS----------------", data.message)
        if (data.message === "Voters Permit sent successfully") {
            toast({
                title: "Voters Permit Sent Successfully",
                description: "Code has been sent to voters email for voting",
            })
        }
        if (election) {
            updateElection(election.id, {
                isongoing: true
            })
        }
        setIsLoading(false)
        route.push('/admin/dashboard/live-election');
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight my-4">Elections</h2>
            </div>
            <div className="mb-4">
                <h1 className="text-xl">Upcoming / Current Election</h1>
                {elections.filter(election => election.archive === false).map(election => (
                    
                    <div className="border rounded-md flex justify-between items-center my-3 p-5" key={election.id}>
                        <div>
                            <h1 className="text-xl">{election.title}</h1>

                            <p className="text-gray-500 text-sm">{election.description}</p>
                        </div>
                        <div>
                            {election.isongoing ? <Link href="/admin/dashboard/live-election"><Button className="bg-blue-500"><CircleDot className="w-4 h-4 mr-2 animate-ping" /> View Live Results</Button></Link> : <Button onClick={handleStartElection}>{isLoading ? <span className="flex align-center justify-center "> <Triangle className="animate-spin" /> Processing... </span> : <span>Start Election</span>}</Button>}
                        </div>
                    </div>
                ))}
                {elections.filter(election => election.archive === false).length === 0 && <div className="flex justify-center my-4">No upcoming Election at the moment</div>}
            </div>
            <div>
                <h1 className="text-xl">Finished Elections</h1>
                {elections.filter(election => election.archive === true).map(election => (
                    <div className="border rounded-md flex justify-between items-center my-3 p-5" key={election.id}>
                        <div>
                            <h1 className="text-xl">{election.title}</h1>

                            <p className="text-gray-500 text-sm">{election.description}</p>
                        </div>
                        <div>
                            <Button><Link href={`/admin/dashboard/elections/${election.id}`}>View Results</Link> </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

