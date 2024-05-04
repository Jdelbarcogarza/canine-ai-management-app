"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
	const [file, setFile] = useState("");
	const imageContainerRef = useRef<HTMLImageElement | null>(null);

	function handleChange(e) {
		console.log(e.target.files);
		setFile(e.target.files[0]);
	}

	const analyzeImageWithAI = async (e) => {
		e.preventDefault();

		const req = await axios.post(
			"http://localhost:3000/api/scanImage",
			{
				filename: file,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		console.log(req.data);
	};


	const displayPicture = async (e: ChangeEvent<HTMLInputElement>) => {

		if (imageContainerRef.current && imageContainerRef.current && e.target.files) {

			imageContainerRef.current.src = URL.createObjectURL(e.target.files[0])
		}

	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form onSubmit={analyzeImageWithAI}>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="picture">Picture</Label>
					<Input id="picture" type="file" onChange={handleChange} />
				</div>
				<Button type="submit">Hola</Button>

				<Image src={"https://placehold.co/100x200"} unoptimized id="photo" className="photo" alt="alt text" ref={imageContainerRef} width={100} height={200} />
  			<input type="file" accept="image/*" capture="environment" id="camera" onChange={displayPicture} />
			</form>
		</main>
	);
}
