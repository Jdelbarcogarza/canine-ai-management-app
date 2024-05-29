"use client";
import {
	Badge,
	Bell,
	CircleUser,
	Cross,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	ScanEye,
	Search,
	ShoppingCart,
	Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AppLogo from "../../../public/fullLogo.jpeg";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'
const revalidate = false;

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
					<div className="hidden border-r bg-muted/40 md:block">
						<div className="flex h-full max-h-screen flex-col gap-2">
							<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
								<Link
									href="/dashboard"
									className="flex items-center gap-2 font-semibold"
								>
									{/* <Image src={AppLogo} width={180} height={70} alt="Vet.AI a Technological Pet Company" /> */}
									{/* <Package2 className="h-6 w-6" /> */}
									<Cross className="h-6 w-6" />
									<span className="">VET.AI</span>
								</Link>
								{/* <Button
									variant="outline"
									size="icon"
									className="ml-auto h-8 w-8"
								>
									<Bell className="h-4 w-4" />
									<span className="sr-only">Toggle notifications</span>
								</Button> */}
							</div>
							<div className="flex-1">
								<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
									<Link
										href="/dashboard"
										className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
									>
										<Home className="h-4 w-4" />
										Inicio
									</Link>
									<Link
										href="/dashboard/newPatient"
										className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
									>
										<ShoppingCart className="h-4 w-4" />
										Nuevo paciente
									</Link>
								</nav>
							</div>
							{/* MAYBE HERE THE LOGOUT GOES */}
							{/* <div className="mt-auto p-4">
					<Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
				</div> */}
						</div>
					</div>

					<div className="flex flex-col">
						<header className="sticky top-0 left-0 right-0 z-10 flex h-16 items-center place-content-between gap-4 px-4 lg:h-[60px] lg:px-6 bg-primary-light-blue">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										className="shrink-0 md:hidden bg-transparent border-none focus:bg-transparent "
									>
										<Menu className="h-5 w-5 stroke-white " />
										<span className="sr-only ">Toggle navigation menu</span>
									</Button>
								</SheetTrigger>
								<SheetContent side="left" className="flex flex-col">
									<nav className="grid gap-2 text-lg font-medium">
										<Link
											href="#"
											className="flex items-center gap-2 text-lg font-semibold"
										>
											<Cross className="h-6 w-6" />
											<span className="sr-only">VET.AI</span>
											VET.AI
										</Link>
										<Link
											href="/dashboard"
											className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
										>
											<Home className="h-5 w-5" />
											Inicio
										</Link>
										<Link
											href="/dashboard/newPatient"
											className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
										>
											<ScanEye className="h-5 w-5" />
											Nuevo Paciente
										</Link>
									</nav>
								</SheetContent>
							</Sheet>
						
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="secondary"
										size="icon"
										className="rounded-full"
									>
										<CircleUser className="h-5 w-5" />
										<span className="sr-only">Toggle user menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Settings</DropdownMenuItem>
									<DropdownMenuItem>Support</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => console.log("Logout")}>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</header>
						{/* container for content */}
						<main className="flex flex-1 flex-col gap-4 p-8 lg:gap-6 lg:p-6">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
