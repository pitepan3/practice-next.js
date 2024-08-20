import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='login'>
      <div className='logo'>
        <span className='img'></span>
        <Link href='/'>로고 클릭하면 Home으로 보내도록 해보자</Link>
      </div>
      <div className='login__container'>
        <div className='login__header'>
          <h3 className='title'>간편 로그인</h3>
        </div>

        <div className='login__main'>
          <div className='naver'>
            <span className='text'>네이버로 시작</span>
          </div>
          <div className='facebook'>
            <span className='text'>페이스북으로 시작</span>
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
            <a href='/'>이메일/비밀번호찾기</a>
          </div>
          <button type='button' className='loginbtn'>로그인</button>
        </div>
      </div>
    </div>
  )
}

export default page