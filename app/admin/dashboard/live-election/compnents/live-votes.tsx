import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import pb from '@/utils/my_pb';
import { useCookies } from 'next-client-cookies';
import { getPosition, getVoters, getVotes } from '../action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



interface Vote {
  id: string;
  // Add additional properties of the Vote record if needed
}

const VoteCounter: React.FC = () => {
  const [voteCount, setVoteCount] = useState<number>(0);
  const [totalVoteCount, setTotalVoteCount] = useState<number>(0);
  const cookies = useCookies();
  useEffect(() => {
    const unsubscribe = pb.client.collection('ballots').subscribe('*', async (e) => {
      if (e.action === 'create') {
        setVoteCount((prevCount) => prevCount + 1);
      } else if (e.action === 'delete') {
        setVoteCount((prevCount) => prevCount - 1);
      }
    });

    // Fetch initial vote count
    const fetchVoteCount = async () => {
        
        const authCookie = cookies.get('pb_auth')
        pb.client.authStore.loadFromCookie(authCookie as any)
      const totalVotes = await getVotes()
      const positions = await getPosition()
      const voters = await getVoters()
    setTotalVoteCount(voters.length * positions.length)
      setVoteCount(totalVotes.length);
    };
    fetchVoteCount();

    return () => {
        pb.client.collection('ballots').unsubscribe('*');  // Unsubscribe from the 'votes' collection when the component unmounts
    };
  }, [cookies]);

  return (
    <Card className='lg:col-span-4'>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 lg:col-span-2">
        <CardTitle className="text-sm font-medium">
            Vote Live Updates
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold">{voteCount}/{totalVoteCount}</div>
        <CardDescription>
           Single Ballot vote count
        </CardDescription>
    </CardContent>
</Card>
  );
};

export default VoteCounter;