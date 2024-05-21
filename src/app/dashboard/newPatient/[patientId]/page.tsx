import React from 'react'

const PatientForm = ({ params }: { params: { patientId: number } }) => {
  return (
    <div>
      PatientForm
      <p className='text-xl text-red-600'>Este es el id {params.patientId} (de momento es falso!!)</p>
    </div>
  )
}

export default PatientForm