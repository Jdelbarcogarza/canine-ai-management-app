"use client";

import React from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';

interface Props {
  patients: Pet[];
  totalPatients: number;
}

const PatientsTable: React.FC<Props> = ({patients, totalPatients}) => {

  const navigator = useRouter()

  return (
    <Table>
    <TableCaption>
      Click en fila para ver detalles de cada uno
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Nombre</TableHead>
        <TableHead>Raza</TableHead>
        <TableHead className="text-right">Color</TableHead>
        <TableHead>Fecha de ingreso</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {patients.length > 0 &&
        patients.map((patient: Pet) => (
          <TableRow key={patient.id} onClick={() => navigator.push(`/dashboard/patient/${patient.id}`)}>
            <TableCell className="font-medium">
              {patient.nombre_perro}
            </TableCell>
            <TableCell>{patient.raza}</TableCell>
            <TableCell className="text-right">{patient.color}</TableCell>
            <TableCell>
              {formatDate(new Date(patient.created_at), "dd/MM/yyyy")}
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total de pacientes</TableCell>
        <TableCell className="text-right">{totalPatients}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
  )
}

export default PatientsTable