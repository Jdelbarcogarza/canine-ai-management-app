"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
	SelectTrigger,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/client";
import BreedOption from "@/types/BreedOption";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	ChangeEvent,
	FormEventHandler,
	SyntheticEvent,
	useRef,
	useState,
} from "react";
import {v4 as uuidv4} from "uuid";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const imageContainerRef = useRef<HTMLImageElement | null>(null);
	const [analysis, setAnalysis] = useState<BreedOption[]>([
		{ label: "Chihuahua", score: 0.12 },
		{ label: "French bulldog", score: 0.321 },
		{ label: "Husky", score: 0.341 },
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [dogRace, setDogRace] = useState("");
	const navigator = useRouter()

	// request to backend
	const analyzeImageWithAI = async (file: File) => {
		const req = await axios.post(
			process.env.NEXT_PUBLIC_BASE_URL + "/api/scanImage",
			{
				filename: file,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return req;
	};

	// diplay image and set state
	const displayPicture = async (e: ChangeEvent<HTMLInputElement>) => {
		if (imageContainerRef.current && e.target.files) {
			if (e.target.files[0]) {
				const fileObject = e.target.files[0];

				imageContainerRef.current.src = URL.createObjectURL(fileObject);

				setFile(fileObject);
			} else {
				imageContainerRef.current.src = "https://placehold.co/100x200";
			}
		}
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		setIsLoading(true);

		e.preventDefault();

		if (file) {
			const req = await analyzeImageWithAI(file);

			setAnalysis(req.data.message);
			if (req.data.message) {
				setDogRace(req.data.message[0].label);
			}
		}

		setIsLoading(false);
	};

	const registerPatient = async (e: SyntheticEvent) => {
		e.preventDefault();
		// TODO. generar IDs con UUID desde el front.

		const recordId = uuidv4();

		const {data, error} = await supabase.from("Mascotas").insert([{id: recordId, raza: dogRace}]);

		if (!error) {
			console.log("This is the data that came back from the update", data);
			navigator.push(`/dashboard/newPatient/${recordId}`)
		}

		console.error("Error al intentar subir data a supabase",error)

	};

	return (
		<main className="flex flex-col h-full items-center md:justify-between md:p-24">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col space-y-4 mt-4 mb-10 w-full item-center justify-center max-w-lg"
			>
				<Image
					src={"https://placehold.co/200x250"}
					unoptimized
					id="photo"
					className="w-full h-auto object-cover  self-center"
					alt="alt text"
					ref={imageContainerRef}
					width={100}
					height={200}
				/>

				<Button asChild variant="outline" className="font-medium text-primary-light-blue border-primary-light-blue active:bg-primary-light-blue active:text-white">
					<Label htmlFor="camera">Captura una foto</Label>
				</Button>
				<Input
					type="file"
					placeholder="Captura una foto"
					accept="image/*"
					capture="environment"
					id="camera"
					className="hidden"
					onChange={displayPicture}
				/>

				<Button type="submit" className="font-medium text-white bg-primary-light-blue active:bg-white active:text-primary-light-blue">Guardar</Button>
			</form>

			<form
				onSubmit={registerPatient}
				className="w-full flex flex-col items-center justify-center space-y-4"
			>
				{isLoading && (
					<div className="relative mt-6 mx-auto inset-x-0 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-neutral-500" />
				)}

				<>
					<Label className="text-base font-medium text-primary-dark-blue w-full">La raza del paciente es:</Label>
					{analysis.length > 0 && (
						<Select
							disabled={isLoading}
							value={dogRace}
							onValueChange={(e) => setDogRace(e)}
						>
							<SelectTrigger className="">
								<SelectValue placeholder={"Raza del paciente"} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{analysis.map((element, index) => (
										<SelectItem key={element.label} value={element.label}>
											{element.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				</>

				<Button className="self-end font-medium text-white bg-primary-light-blue active:bg-white active:text-primary-light-blue" type="submit">
					Siguiente
				</Button>
			</form>
		</main>
	);
}
