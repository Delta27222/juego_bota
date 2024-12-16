import React from 'react'
import Confetti from 'react-confetti'

function Surprice() {
  return (
    <section className='mb-10 flex flex-col justify-center items-center'>
      <Confetti width={1500} height={1500} gravity={0.6} />
      <h1 className='text-4xl text-green-600 text-center'>Si, efectivamente la bota le toca a 👇🏻</h1>
    </section>
  )
}

export default Surprice