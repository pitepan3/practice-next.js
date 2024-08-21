import React from 'react'
import Link from 'next/link'

const client_id = '32a92ed3ece50a34d8287d91e7fbce9e'
const redirect_uri = 'https://localhost:3000/login_kakao'
const response_type = 'code' 

const page = () => {

  const authParam = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type
  })

  return (
    <div className='login'>
      <Link href='/'>
        <div className='logo'></div>
      </Link>
      <div className='login__container'>
        <div className='login__header'>
          <h3 className='title'>간편 로그인</h3>
        </div>

        <div className='login__main'>
          <div className='naver'>
            <span className='text'>네이버로 시작</span>
          </div>
          <div className='kakao'>
            <Link href={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`} className='text'>카카오톡으로 시작</Link>
          </div>

          <div className='login__form'>
            <p className='title'>
              이메일 직접 로그인
            </p>
            <input id='userid' type='text' placeholder='이메일 주소' />
            <input id='userpw' type='password' placeholder='비밀번호(8자리 이상)' />
          </div>
        </div>
        <div className='login__footer'>
          <div className='email'>
            <input className='checkbox' type='checkbox' />
            <span>이메일저장</span>
            <a href='/find'>이메일/비밀번호찾기</a>
          </div>
          <button type='button' className='loginbtn'>로그인</button>
          <Link href='/signup'>
            <button type='button' className='signupbtn'>회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page