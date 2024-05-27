'use client';
import React from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
	SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const PatientForm = ({ params }: { params: { patientId: number } }) => {
  const [date, setDate] = React.useState<Date>()
  return (
    <div className='px-3 text-primary-dark-blue'>
      <div className='flex flex-col justify-center text-center items-center'>
        <p className="text-3xl font-bold mb-4">Registrar al paciente</p>
        <p className='w-10/12 text-sm text-slate-400 mb-4'>Ingresa aqui la información del paciente para registrarlo en el sistema</p>
      </div>
      
      {/*<p className='text-xl text-red-600'>Este es el id {params.patientId} (de momento es falso!!)</p>*/}
      <form>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className=" text-md font-bold mb-1">Nombre</label>          
          <Input type="text" id="name" placeholder="Nombre" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className="  text-md font-bold mb-1">Raza</label>          
          <Input type="text" id="raza" placeholder="Raza" disabled/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className="  text-md font-bold mb-1">Sexo</label>          
          <Select
            //disabled={isLoading}
            //value={dogRace}
            //onValueChange={(e) => setDogRace(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/*analysis.map((element, index) => (
                  <SelectItem key={element.label} value={element.label}>
                    {element.label}
                  </SelectItem>
                ))*/}
                <SelectLabel>Sexo</SelectLabel>
                <SelectItem value="hembra">Hembra</SelectItem>
                <SelectItem value="macho">Macho</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className="  text-md font-bold mb-1">Color</label>          
          <Select
            //disabled={isLoading}
            //value={dogRace}
            //onValueChange={(e) => setDogRace(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/*analysis.map((element, index) => (
                  <SelectItem key={element.label} value={element.label}>
                    {element.label}
                  </SelectItem>
                ))*/}
                <SelectLabel>Color</SelectLabel>
                <SelectItem value="negro">Negro</SelectItem>
                <SelectItem value="blanco">Blanco</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className="  text-md font-bold mb-1">Fecha de nacimiento</label>     
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className="  text-md font-bold mb-1">Comentarios adicionales</label>          
          <Textarea placeholder="Ingresa aquí tus comentarios" />
        </div>
        <p className=" text-2xl font-bold mt-11 mb-4">Datos del responsable</p>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className=" text-md font-bold mb-1">Nombre del responsable</label>          
          <Input type="text" id="nameR" placeholder="Nombre" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className=" text-md font-bold mb-1">Apellido(s)</label>          
          <Input type="text" id="lasName" placeholder="Apellido(s)" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <label className=" text-md font-bold mb-1">Telefono</label>          
          <Input type="number" id="phone" placeholder="Telefono" />
        </div>
      </form>
      <Button asChild className="mt-11 font-medium text-white bg-primary-light-blue active:bg-white active:text-primary-light-blue" type="submit">
        <Link href="/dashboard/newPatient">Hay que asignar la ruta correcta al resumen</Link>
      </Button>

    </div>
  )
}

export default PatientForm