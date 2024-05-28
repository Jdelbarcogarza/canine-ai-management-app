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
    <div className='text-primary-dark-blue'>
      <div className='flex flex-col justify-center text-center items-center'>
        <h1 className="mb-4">Registrar al paciente</h1>
        <p className='w-10/12 text-sm text-slate-400 mb-4'>Ingresa aqui la información del paciente para registrarlo en el sistema</p>
      </div>
      
      {/*<p className='text-xl text-red-600'>Este es el id {params.patientId} (de momento es falso!!)</p>*/}
      <form>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <h4 className="mb-1">Nombre</h4>          
          <Input type="text" id="name" placeholder="Nombre" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <h4 className="mb-1">Raza</h4>          
          <Input type="text" id="raza" placeholder="Raza" disabled/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <h4 className="mb-1">Sexo</h4>          
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
          <h4 className="mb-1">Color</h4>          
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
          <h4 className="mb-1">Fecha de nacimiento</h4>     
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal border-neutral-200",
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
          <h4 className="mb-1">Comentarios adicionales</h4>          
          <Textarea placeholder="Ingresa aquí tus comentarios" />
        </div>
        <h2 className="mt-11 mb-4">Datos del responsable</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <h4 className="mb-1">Nombre del responsable</h4>          
          <Input type="text" id="nameR" placeholder="Nombre" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <h4 className="mb-1">Apellido(s)</h4>          
          <Input type="text" id="lasName" placeholder="Apellido(s)" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <h4 className="mb-1">Telefono</h4>          
          <Input type="number" id="phone" placeholder="Telefono" />
        </div>
      </form>
      <Button asChild className="flex justify-center mt-5 font-medium" type="submit">
        <Link href="/dashboard/newPatient/{params.patientId}/summary">Siguiente</Link>
      </Button>

    </div>
  )
}

export default PatientForm