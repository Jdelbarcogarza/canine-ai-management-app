import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { formatDate } from "date-fns";
import Image from "next/image";

const getPageData = async (patientId: string) => {
	const pet = await supabase.from("Mascotas").select("*").eq("id", patientId);

	if (!pet.error) {
		const owner = await supabase
			.from("Clientes")
			.select("*")
			.eq("id", pet!.data[0]!.owner_id!);
			
		if (!owner.error) {
			const pic = supabase.storage.from("dogPictures").getPublicUrl(`dogPics/${patientId}`, {download: true})
			return { owner: owner.data[0], pet: pet.data[0] as Pet, pic: pic.data.publicUrl };
		}
	}



	return { message: pet!.error!.message, pic: "" };
};

export default async function PatientDetails({
	params,
}: {
	params: { patientId: string };
}) {
	const { pet, owner, message, pic } = await getPageData(params.patientId);

	console.log(pic);

	return (
		<div className="flex flex-col">
			<div className="flex flex-row mb-8 space-x-4">
				<button type="button">
					<Link href="/dashboard">
						<svg className="w-5 h-5 text-primary-dark-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
						</svg>
					</Link>
				</button>
				<h2 className="text-primary-dark-blue">Detalles de paciente</h2>
			</div>
			<Image className="w-80 rounded-lg mb-6" width={256} height={256} src={pic} alt="Pet image" />
			<div className="relative overflow-x-auto w-80 rounded-md mb-4 border border-gray-200">
				<table className="w-full text-sm text-left rtl:text-right text-gray-900 ">
					<caption className="text-center bg-gray-50 p-3 text-primary-dark-blue font-bold">Datos del paciente</caption>
					<tbody>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Nombre:
							</th>
							<td className="px-6 py-4">{pet!.nombre_perro}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Raza:
							</th>
							<td className="px-6 py-4">{pet!.raza}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Sexo:
							</th>
							<td className="px-6 py-4">{pet!.genero}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Color:
							</th>
							<td className="px-6 py-4">{pet!.color}</td>
						</tr>
						<tr className="bg-white border-b ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Fecha de nacimiento:
							</th>
							<td className="px-6 py-4">
								{formatDate(new Date(pet!.fecha_nac), "dd/MM/yyyy")}
							</td>
						</tr>
						<tr className="bg-white">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Comentarios
							</th>
							<td className="px-6 py-4">{pet!.comentarios}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="relative overflow-x-auto w-80 rounded-md border border-gray-200">
				<table className="w-full text-sm text-left rtl:text-right text-gray-900 ">
					<caption className="text-center bg-gray-50 p-3 text-primary-dark-blue font-bold">Datos del responsable</caption>
					<tbody>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Nombre:
							</th>
							<td className="px-6 py-4">{owner!.Nombre}</td>
						</tr>
						<tr className="bg-white border-b  ">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Apellido:
							</th>
							<td className="px-6 py-4">{owner!.Apellido}</td>
						</tr>
						<tr className="bg-white">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap "
							>
								Celular:
							</th>
							<td className="px-6 py-4">{owner!.Tel}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
