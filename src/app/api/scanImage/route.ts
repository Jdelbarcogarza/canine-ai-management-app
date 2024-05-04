import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	
	const formData = await req.formData()
	const filename = formData.get("filename")

	console.log(filename)

	if (!filename) {
		return Response.json({})
	}
	
	const response = await fetch(
		"https://api-inference.huggingface.co/models/dima806/133_dog_breeds_image_detection",
		{
			headers: {
				Authorization: "Bearer " + process.env.HF_TOKEN,
			},
			method: "POST",
			body: filename,
		}
	);

	return Response.json({"message": await response.json()})
}
