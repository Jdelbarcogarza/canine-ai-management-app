"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BreedOption from "@/types/BreedOption";
import axios from "axios";
import Image from "next/image";
import {
	ChangeEvent,
	FormEventHandler,
	SyntheticEvent,
	useRef,
	useState,
} from "react";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const imageContainerRef = useRef<HTMLImageElement | null>(null);
	const [analysis, setAnalysis] = useState<BreedOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);

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

		console.log(req.data);
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
		}

		setIsLoading(false);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-start md:justify-between p-8 md:p-24">
			<h1 className="text-xl font-mono">Canine AI</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col space-y-6 mt-4 w-full item-center justify-center max-w-lg"
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

				<Button asChild variant="outline">
					<Label htmlFor="camera">Take picture</Label>
				</Button>
				<Input
					type="file"
					placeholder="Take a picture"
					accept="image/*"
					capture="environment"
					id="camera"
					className="hidden"
					onChange={displayPicture}
				/>

				<Button type="submit">Scan</Button>
			</form>
			<div className="w-full max-w-md mt-8 border rounded p-2 flex-grow">
				<p className="font-mono">Results 🐶</p>
				<p className="text-xs">Ordered by score</p>

				{isLoading && (
					<div className="relative mt-6 mx-auto inset-x-0 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-neutral-500" />
				)}

				{analysis.length > 0 &&
					analysis.map((element, index) => (
						<div
							key={element.label}
							className="border bg-slate-200 p-1 flex flex-col w-full"
						>
							<p>
								<span className="font-bold">#{index}</span> {element.label}
							</p>
							<p><span>Fidelity</span>{element.score.toFixed(5)}</p>
						</div>
					))}
			</div>
		</main>
	);
}
