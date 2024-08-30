import Link from 'next/link'
import React from 'react'

const myPage = () => {
  return (
    <main className='myPage'>
      <div className='myPage__inner'>
        <section className='myPage__header'>
          <Link href={`/`}>
            Home
          </Link>
        </section>
        <section className='myPage__main'>
          main
        </section>
      </div>
    </main>
  )
}

export default myPage