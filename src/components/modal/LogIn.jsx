"use client"

import React from 'react'
import { signIn, useSession } from 'next-auth/react'

const Login = ({ isLoginVisible, onClose }) => {
  const { data: session } = useSession();

  return (
    <section className={`login ${isLoginVisible ? 'visible' : ''}`}>
      <div className='login__container'>
        <div className='login__header'>
          <h3 className='title'>간편 로그인</h3>
          <a className='closeBtn' onClick={onClose}></a>
        </div>
        <div className='login__main'>
          <div className='kakao'>
            <button onClick={() => signIn('kakao')} className='text'>카카오톡으로 시작</button>
          </div>
          <div className='naver'>
            <button  onClick={() => signIn('naver')}  className='text'>네이버로 시작</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login