import React from 'react'
import Link from 'next/link'

export default function SignUp({ isSignupVisible, onClose }) {
  return (
    <div className={`signup ${isSignupVisible ? 'visible' : ''}`}>
      <div className='signup__container'>
        <div className='signup__header'>
          <h3 className='title'>개인회원 가입을 환영합니다!</h3>
          <a className='closeBtn' onClick={onClose}></a>
        </div>

        <div className='signup__main'>
          <div className='naver'>
            <button className='text'>네이버 가입</button>
          </div>
          <div className='kakao'>
            <button className='text'>카카오톡 가입</button>
          </div>
        </div>
      </div>
    </div>
  )
}