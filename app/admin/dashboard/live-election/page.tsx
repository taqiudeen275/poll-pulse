'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleDot } from 'lucide-react'
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react'
import { getCandidates, getElections, getVoters, updateElection } from './action';
import pb from '@/utils/my_pb';
import { Button } from '@/components/ui/button';
import Countdown from './compnents/countdown';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import VoteCounter from './compnents/live-votes';
import {useRouter} from "next/navigation";


export default function LiveElectionPage() {
    const [voters, setVoters] = useState<RecordModel[]>([]);
    const [candidates, setCandidate] = useState<RecordModel[]>([]);
    const [election, setElection] = useState<RecordModel>();
    const route = useRouter();

    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await getVoters();
            const cresult = await getCandidates();
            const eresult = await getElections()


            setVoters(result);
            setCandidate(cresult);
            const electionqs = eresult.find(election => election.isongoing === true);   
            setElection(electionqs);
        }
        fetchInitialData();

    }, []);

    async function handleEndElection(){
        await updateElection(election!.id, {archive: true});
       route.push(`/admin/dashboard/elections/${election!.id}`);

    }

    return (
        <>
            {election && (<>
                <h2 className="text-xl tracking-tight my-4 flex gap-3 items-center"><CircleDot className='text-red-500 animate-pulse' /> Ongoing Election</h2>
            
            <h2 className='text-3xl font-bold tracking-tight my-4'>{election.title}</h2>
    

        <div className="flex-1 space-y-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Voters
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{voters.length}</div>
                  
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Candidate</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{candidates.length}</div>

                    </CardContent>
                </Card>
              
            </div>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7">
                <VoteCounter />
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Time Remaining</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-8 ">
                    <Countdown targetTime={election.end_at} />
                    </CardContent>
                </Card>


            </div>
        </div>  
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>End Election</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will end the current ongoing election, which will stop voters from participating in the election
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEndElection}>Sure</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

            </>)}
            {!election && <div className="w-full h-full flex justify-center items-center    ">
                No ongoing election at the moment
            </div>}
        </>
    )
}

