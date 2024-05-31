"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
	SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const PatientForm = ({ params }: { params: { patientId: string } }) => {
	const navigate = useRouter();
	const [date, setDate] = React.useState<Date>();
	const [pet, setPet] = useState<any | null>();
	const [sexo, setSexo] = useState("");
	const [name, setName] = useState("");
	const [comments, setComments] = useState("");
	// todas las opciones que vienen de la db
	const [colors, setColors] = useState("");
	// opcion seleccionada
	const [selectedColor, setSelectedColor] = useState("");

	// datos para crear un cliente
	const [ownerName, setOwnerName] = useState("");
	const [ownerLastname, setOwnerLastname] = useState("");
	const [tel, setTel] = useState("");

	useEffect(() => {
		const getPatientData = async () => {
			const { data, error } = await supabase
				.from("Mascotas")
				.select("*")
				.eq("id", params.patientId);

			if (!error) {
				setPet(data[0]);

				console.log(data[0]);
			}
		};

		getPatientData();
	}, []);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("These are the values");
		const recordId = uuidv4();

		// crear cliente o seleccionar cliente existente
		const newClient = await supabase.from("Clientes").insert([
			{
				id: recordId,
				Nombre: ownerName,
				Apellido: ownerLastname,
				Tel: tel
			},
		]);

		if (!newClient.error) {
			// subir mascota, y asignar mascota a cliente

			const newPet = await supabase
				.from("Mascotas")
				.update({
					owner_id: recordId, // O EL ID DEL DUEÑO YA REGISTRADO
					genero: sexo,
					nombre_perro: name,
					comentarios: comments,
					color: selectedColor,
					fecha_nac: date,
				})
				.eq("id", params.patientId);


				if (!newPet.error) {
					navigate.push(`/dashboard/newPatient/${params.patientId}/summary`)
				}

				console.log("ERROR ON PET", newPet.error)
		}
	};

	return (
		<div className="text-primary-dark-blue">
			<div className="flex flex-col justify-center text-center items-center">
				<h1 className="mb-4">Registrar al paciente</h1>
				<p className="w-10/12 text-sm text-slate-400 mb-4">
					Ingresa aqui la información del paciente para registrarlo en el sistema
				</p>
			</div>

			{/*<p className='text-xl text-red-600'>Este es el id {params.patientId} (de momento es falso!!)</p>*/}
			<form onSubmit={handleSubmit}>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Nombre</h4>
					<Input type="text" id="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Raza</h4>
					<Input
						type="text"
						id="raza"
						placeholder={pet ? pet.raza : ""}
						disabled
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Sexo</h4>
					<Select value={sexo} onValueChange={(e) => setSexo(e)}>
						<SelectTrigger>
							<SelectValue placeholder="Sexo" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sexo</SelectLabel>
								<SelectItem value="hembra">Hembra</SelectItem>
								<SelectItem value="macho">Macho</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Color</h4>
					<Select
						value={selectedColor}
						onValueChange={(e) => setSelectedColor(e)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Color" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Color</SelectLabel>
								<SelectItem value="negro">Negro</SelectItem>
								<SelectItem value="blanco">Blanco</SelectItem>
								<SelectItem value="gris">Gris</SelectItem>
								<SelectItem value="cafe">Café</SelectItem>
								<SelectItem value="beige">Beige</SelectItem>
								<SelectItem value="otro">Otro</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Fecha de nacimiento</h4>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? (
									format(date, "dd/MM/yyyy")
								) : (
									<span>Selecciona una fecha</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Comentarios adicionales</h4>
					<Textarea
						placeholder="Ingresa aquí tus comentarios"
						value={comments}
						onChange={(e) => setComments(e.target.value)}
					/>
				</div>
				<h2 className="mt-11 mb-4">Datos del responsable</h2>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Nombre del responsable</h4>
					<Input
						type="text"
						id="nameR"
						placeholder="Nombre"
						value={ownerName}
						onChange={(e) => setOwnerName(e.target.value)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Apellido(s)</h4>
					<Input
						type="text"
						id="lasName"
						placeholder="Apellido(s)"
						value={ownerLastname}
						onChange={(e) => setOwnerLastname(e.target.value)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
					<h4 className="mb-1">Telefono</h4>
					<Input
						type="number"
						id="phone"
						placeholder="Telefono"
						value={tel}
						onChange={(e) => setTel(e.target.value)}
					/>
				</div>
			<Button
				className="flex w-full justify-center mt-5 font-medium text-white bg-primary-light-blue active:bg-white active:text-primary-light-blue"
				type="submit"
			>
				Siguiente
			</Button>
			</form>
		</div>
	);
};

export default PatientForm;
