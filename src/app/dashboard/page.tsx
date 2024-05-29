import PatientsTable from "@/components/ui/dashboard/PatientsTable";
import { supabase } from "@/lib/supabase/client";
import { format, subWeeks } from "date-fns";
import Error from "next/error";
import React from "react";

async function patientsList() {
	// obtener todos los pacientes registrados esta semana
	const patients = await supabase
		.from("Mascotas")
		.select("*", { count: "exact" })
		.gt("created_at", subWeeks(new Date(), 1).toISOString());

	console.log(patients);

	if (!patients.error) {
		return { patients: patients.data as Pet[], totalPatients: patients.count };
	}

	return { message: "ERROR" };
}

const Dashboard = async () => {
	const { patients, totalPatients } = await patientsList();

	return (
		<div>
			<h2>Tabla de pacientes</h2>

			<div className="flex">
				<PatientsTable
					patients={patients ? patients : []}
					totalPatients={totalPatients ? totalPatients : 0}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
