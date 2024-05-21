import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {

	const createAccount = async (formData: FormData) => {
		"use server"
		const userPassword = formData.get("password") as string;
		const userEmail = formData.get("email") as string;

		const { data, error } = await supabase.auth.signUp({
			email: userEmail,
			password: userPassword,
		})

		if (!error) {
			return redirect("/dashboard")
		}

		console.log("Ha habido un error creando a cuenta", error)

		console.log("This is the entered data", userEmail, userPassword);
	};

	return (
		<div className="flex flex-col justify-center items-center absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Crear cuenta</CardTitle>
					<CardDescription>
						Enter your email below to create your account.
					</CardDescription>
				</CardHeader>
				<form action={createAccount}>

				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" name="password" required />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" type="submit">Sign in</Button>
				</CardFooter>
				</form>
			</Card>
		</div>
	);
}
