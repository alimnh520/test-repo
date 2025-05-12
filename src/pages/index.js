'use client'
import React, { useEffect, useState } from 'react'

const index = () => {
  const [userdata, setUserData] = useState('');
  useEffect(() => {
    async function getUser(params) {
      try {
        const res = await fetch('/api/data', {
          method: 'GET'
        });
        const data = await res.json();
        setUserData(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  return (
    <div className='w-full h-screen flex gap-y-5 flex-col items-center justify-center bg-green-700 text-5xl font-semibold'>
      <h1>Hello Nahid</h1>
      {
        userdata ? userdata.map((elem) => {
          return (
            <div className='flex flex-col items-start' key={elem._id}>
              <h1>{elem.divisionName}</h1>
            </div>
          )
        }) : <p>Loading.....</p>
      }
    </div>
  )
}

export default index