import React from 'react'
import useGat from '../../hooks/useGat';

function Students() {

    const { data : Students } = useGat("Students");
    console.log(Students);
    
  return (
    <div>Students</div>
  )
}

export default Students