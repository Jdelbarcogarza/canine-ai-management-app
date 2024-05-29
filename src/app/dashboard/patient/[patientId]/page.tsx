import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { formatDate } from "date-fns";

const getPageData = async (patientId: string) => {
	const pet = await supabase.from("Mascotas").select("*").eq("id", patientId);

	if (!pet.error) {
		const owner = await supabase
			.from("Clientes")
			.select("*")
			.eq("id", pet!.data[0]!.owner_id!);

		if (!owner.error) {
			return { owner: owner.data[0], pet: pet.data[0] as Pet };
		}
	}

	return { message: pet!.error!.message };
};

export default async function PatientDetails({
	params,
}: {
	params: { patientId: string };
}) {
	const { pet, owner, message } = await getPageData(params.patientId);

	console.log(pet, owner);

	return (
		<div>
			<h2>Detalles de paciente</h2>
			<div className="relative overflow-x-auto rounded-md">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
					<tbody>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
							>
								Nombre:
							</th>
							<td className="px-6 py-4">{pet!.nombre_perro}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
							>
								Raza:
							</th>
							<td className="px-6 py-4">{pet!.raza}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
							>
								Sexo:
							</th>
							<td className="px-6 py-4">{pet!.genero}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
							>
								Color:
							</th>
							<td className="px-6 py-4">{pet!.color}</td>
						</tr>
						<tr className="bg-white">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
							>
								Fecha de nacimiento:
							</th>
							<td className="px-6 py-4">
								{formatDate(new Date(pet!.fecha_nac), "dd/MM/yyyy")}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}