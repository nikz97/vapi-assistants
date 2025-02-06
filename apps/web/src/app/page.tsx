"use client";

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {Button} from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Patient } from './types';
import { getPatients, initiateWorkflow } from './routes';



const PatientsTable: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getPatients().then((data) => {
      setPatients(data);
    });
  }
  , []);
  
  const handleStartWorkflow = (patientId: string) => {
    try{
      console.log(`Starting workflow for patient ${patientId}`);
      initiateWorkflow(patientId);
    } catch(e) {
      console.log("Failed to initiate workflow", e);
    }
    
  }

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.status}</TableCell>
                <TableCell>
                  {patient.status === 'NOT_CONTACTED' && (
                    <Button
                      variant="default"
                      onClick={() => handleStartWorkflow(patient.patientId)}
                    >
                      Start Workflow
                    </Button>
                  )}
                  {
                    patient.status !== 'NOT_CONTACTED' && (
                      <Button
                        variant="default"
                        onClick={() => handleStartWorkflow(patient.patientId)}
                      >
                        View Details
                      </Button>
                    )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      </div>
    </div>
  );
};

export default PatientsTable;