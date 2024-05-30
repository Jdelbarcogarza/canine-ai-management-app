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
		<div className="flex flex-col justify-center items-center absolute h-full w-full bg-cream-light">
			<img className="justify-center h-24 mb-12" src={"/fullLogo.jpeg" }/>
			<Card className="w-9/12 max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl text-center text-primary-dark-blue">Crear cuenta</CardTitle>
					<CardDescription className="text-center">
						Ingresa tu correo electrónico y una contraseña para crear tu cuenta.
					</CardDescription>
				</CardHeader>
				<form action={createAccount}>

				<CardContent className="grid gap-4">
					<div className="grid gap-2 text-primary-dark-blue">
						<Label htmlFor="email">Correo electrónico</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2 ">
						<Label htmlFor="password">Contraseña</Label>
						<Input id="password" type="password" name="password" required />
					</div>
				</CardContent>
				<CardFooter className="flex flex-col">
					<Button className="w-full" type="submit">Crear cuenta</Button>
					<Separator orientation="horizontal" className="my-3" />
					<Button asChild variant="link">
						<Link href="/" className="text-primary-dark-blue">Inicia sesión</Link>
					</Button>
				</CardFooter>
				</form>
			</Card>
		</div>
	);
}
