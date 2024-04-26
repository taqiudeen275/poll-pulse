"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/custom/data-table"
import { useEffect, useState } from "react";
import pb from "@/utils/my_pb";
import { RecordModel } from "pocketbase";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { AddCandidate } from "./components/add";

interface CandidateProb {
    id: number;
    full_name: string;
    email: string;
    position: string;
    photo: string;
    slogan: string;
    manifesto: string;
    created: string;
    updated: string;
}


export default function CandidatePage() {
    const [candidates, setCandidates] = useState<RecordModel[]>([]);
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('/api/admin/candidate', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json()
                setCandidates(data)
            } catch (error) {
            }
        };

        fetchCandidates();
    }, []);
    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight my-4">Candidate</h2>

            </div>
            <DataTable data={candidates} columns={[
                { accessorKey: 'full_name', header: 'Full Name' },
                { accessorKey: 'email', header: 'Email' },
                // {accessorKey: 'position', header: 'Position'},
                { accessorKey: 'created', header: 'Created At' },
                { accessorKey: 'updated', header: 'Modified At' },

            ]} filter="full_name"></DataTable>

        </>
    )
}