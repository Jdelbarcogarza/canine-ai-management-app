import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Label } from "@/components/ui/label";


export default function Summary() {
return(
    <div>
        <div className="flex flex-col justify-center text-center items-center mb-6 pt-12 pb-6 px-3 rounded-lg bg-slate-50">
            <img className="size-64 rounded-full mb-6" src={"/dogExample.jpeg" }/>
            <h2 className="text-primary-dark-blue mb-6">Confirma los datos</h2>
            
            <div className="relative overflow-x-auto rounded-md ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <tbody>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Nombre:</th>
                            <td className="px-6 py-4">Max</td>
                        </tr>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Raza:</th>
                            <td className="px-6 py-4">Chihuahua</td>
                        </tr>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Sexo:</th>
                            <td className="px-6 py-4">Masculino</td>
                        </tr>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Color:</th>
                            <td className="px-6 py-4">Amarillo</td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Fecha de nacimiento:</th>
                            <td className="px-6 py-4">DD/MM/AAAA</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center space-x-6">
            <Button asChild variant="outline" className="font-medium">
                <Link href="/dashboard/newPatient/{params.patientId}">Regresar</Link>
            </Button>
            <Button asChild className="font-medium" type="submit">
                <Link href="/dashboard">Guardar</Link>
            </Button>
        </div>
        
    </div>
);
}