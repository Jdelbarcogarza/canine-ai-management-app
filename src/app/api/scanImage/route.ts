import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	
	const formData = await req.formData()
	const filename = formData.get("filename")

	console.log(filename)

	if (!filename) {
		return Response.json({})
	}
	
	const response = await fetch(
		process.env.HF_ENDPOINT ?? "",
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
