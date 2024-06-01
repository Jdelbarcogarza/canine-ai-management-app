import PatientsTable from "@/components/ui/dashboard/PatientsTable";
import { supabase } from "@/lib/supabase/client";
import { format, subWeeks } from "date-fns";
import Error from "next/error";
import React from "react";

export const dynamic = 'force-dynamic'

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
			<div>
				<h1 className="text-primary-dark-blue mb-2">Tabla de pacientes</h1>
				<p className="text-sm text-slate-400 mb-8">Haga click en la fila para ver mas información de cada paciente</p>

				<div className="flex flex-start w-80">
					<div className="overflow-scroll rounded-lg border border-slate-100">
						<PatientsTable
							patients={patients ? patients : []}
							totalPatients={totalPatients ? totalPatients : 0}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
