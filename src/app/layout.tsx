"use client"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";


import { cn } from "@/lib/utils";
import Script from "next/script";
import { Button } from "@/components/ui/button";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
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
				{children}
			</body>
		</html>
	);
}
