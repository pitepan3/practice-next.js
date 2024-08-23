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
            <span className='text'>네이버 가입</span>
          </div>
          <Link href='https://accounts.kakao.com/weblogin/create_account/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A3000%252Flogin_kakao%26through_account%3Dtrue%26client_id%3D32a92ed3ece50a34d8287d91e7fbce9e&lang=ko#selectVerifyMethod' className='kakao'>
            <span className='text'>카카오톡 가입</span>
          </Link>
        </div>
      </div>
    </div>
  )
}