import React from 'react'
import Link from 'next/link'

export default function signup() {
  return (
    <div className='signup'>
      <div className='logo'>
        <span className='img'></span>
        <Link href='/'>로고 클릭하면 Home으로 보내도록 해보자</Link>
      </div>
      <div className='signup__container'>
        <div className='signup__header'>
          <h3 className='title'>title</h3>
        </div>

        <div className='signup__main'>
          <div className='naver'>
            <span className='text'>text</span>
          </div>
          <div className='facebook'>
            <span className='text'>text</span>
          </div>
          <div className='email'>
            <span className='text'>text</span>
          </div>
        </div>
      </div>
    </div>
  )
}