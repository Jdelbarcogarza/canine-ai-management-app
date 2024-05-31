'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getData(patientId: string) {
    const res = await supabase.from("Mascotas").select("*").eq("id", patientId)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    const pic = supabase.storage.from("dogPictures").getPublicUrl(`dogPics/${patientId}`, {download: true})

    console.log(pic)
   
    if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(`Failed to fetch data ${res.error?.message}`);
    }

    console.log(res.data![0])
       return {pet: res.data![0], pic: pic.data.publicUrl};
  }


export default function Summary({ params }: { params: { patientId: string } }) {
    const [finalPet , setFinalPet] = useState<Pet | null>(null)
    const [finalPic, setFinalPic] = useState("");

    useEffect(() => {
        const trigger = async () => {

            const {pet, pic} = await getData(params.patientId);
            setFinalPet(pet)
            setFinalPic(pic)
        }
        trigger()
    }, [])

    if (!finalPet) {
        return <div>Loading</div>
    }

return(
    <div>
        <div className="flex flex-col justify-center text-center items-center mb-6 pt-12 pb-6 px-3 rounded-lg bg-slate-50">
            <img className="size-64 rounded-full mb-6" src={finalPic} width={64} height={64} alt={finalPet.nombre_perro}/>
            <h2 className="text-primary-dark-blue mb-6">Confirma los datos</h2>
            
            <div className="relative overflow-x-auto rounded-md ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <tbody>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Nombre:</th>
                            <td className="px-6 py-4">{finalPet.nombre_perro}</td>
                        </tr>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Raza:</th>
                            <td className="px-6 py-4">{finalPet.raza}</td>
                        </tr>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Sexo:</th>
                            <td className="px-6 py-4">{finalPet.genero}</td>
                        </tr>
                        <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Color:</th>
                            <td className="px-6 py-4">{finalPet.color}</td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Fecha de nacimiento:</th>
                            <td className="px-6 py-4">{format(new Date(finalPet.fecha_nac), "dd/MM/yyyy")}</td>
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