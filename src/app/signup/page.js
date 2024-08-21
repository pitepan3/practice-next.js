import React from 'react'
import Link from 'next/link'

export default function signup() {
  return (
    <div className='signup'>
      <Link href='/'>
        <div className='logo'></div>
      </Link>
      <div className='signup__container'>
        <div className='signup__header'>
          <h3 className='title'>개인회원 가입을 환영합니다!</h3>
        </div>

        <div className='signup__main'>
          <div className='naver'>
            <span className='text'>네이버 가입</span>
          </div>
          <div className='facebook'>
            <span className='text'>페이스북 가입</span>
          </div>
          <div className='insta'>
            <span className='text'>인스타그램 가입</span>
          </div>
          <div className='email'>
            <span className='text'>이메일 가입</span>
          </div>
        </div>
      </div>
    </div>
  )
}