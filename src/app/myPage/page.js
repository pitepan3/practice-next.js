'use client'

import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react'

const myPage = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // 로그아웃 후 홈으로 이동
  };

  return (
    <main className='myPage'>
      <div className='myPage__inner'>
        <section className='myPage__header'>
          <div className='left'>
            <span className='logo'></span>
            <Link href={'/'} className='title'>Project Name</Link>
          </div>
          <div className='right'>
              <button onClick={handleLogout} className='logoutBtn'>로그아웃</button>
          </div>
        </section>
        <section className='myPage__main'>
          main
        </section>
        <section className='myPage__footer'>
          footer
        </section>
      </div>
    </main>
  )
}

export default myPage