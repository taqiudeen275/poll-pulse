"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from './../../components/overview'
import { RecentActions } from './../../components/recent-sales'
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';
import { getVoters } from './voters/action';
import { getCandidates, getElections } from './live-election/action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const { POCKET_BASE_URL } = process.env;

export default function Home() {
    const [voters, setVoters] = useState<RecordModel[]>([]);
    const [candidates, setCandidate] = useState<RecordModel[]>([]);
    const [election, setElection] = useState<RecordModel>();
    
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await getVoters();
            const cresult = await getCandidates();
            const eresult = await getElections()


            setVoters(result);
            setCandidate(cresult);
            const electionqs = eresult.find(election => election.archive === false);   
            setElection(electionqs);
        }
        fetchInitialData();

    }, []);

    // @ts-ignore
    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <h2 className="text-3xl font-bold tracking-tight my-4">Current/Last Election</h2>

            <div className="flex-1 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                            <CardTitle className="text-sm font-medium">Candidate</CardTitle>
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
                <h1 className='text-2xl mb-2'>Quick Links</h1>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7">
                    <Button>
                        <Link href={'dashboard/elections'} className="lg:col-span-4">Go to Elections
                        </Link>
                    </Button>

                    <Button>
                        <Link href={'dashboard/candidates'} className="lg:col-span-4">View Candidates
                        </Link>
                    </Button>
                    <Button>
                        <Link href={'dashboard/voters'} className="lg:col-span-4">View voters
                        </Link>
                    </Button>
                    <Button>
                        <Link href={POCKET_BASE_URL+"/_/"} className="lg:col-span-4">Other Admin Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
