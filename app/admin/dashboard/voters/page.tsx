"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/custom/data-table"
import { useEffect, useState } from "react";
import pb from "@/utils/my_pb";
import { RecordModel } from "pocketbase";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getVoters } from "./action";


export const votersColumn: ColumnDef<RecordModel>[]=[
    {accessorKey: 'full_name', header: 'Full Name'},
    {accessorKey: 'email', header: 'Email'},
    {accessorKey: 'student_id', header: 'Student Id'},
    {accessorKey: 'created', header: 'Created At'},
    {accessorKey: 'updated', header: 'Modified At'},
]

export default function VoterViewPage(){
    const [voters, setVoters] = useState<RecordModel[]>([]);

    useEffect(()=>{
        const fetchVoters = async () => {
            const result = await getVoters();
            setVoters(result);
        }
        fetchVoters();
    },[]);
    return (
        <>
                <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight my-4">Voters</h2>
           
            </div>
            <DataTable data={voters} columns={votersColumn} filter="full_name"></DataTable>
        </>
    )
}

