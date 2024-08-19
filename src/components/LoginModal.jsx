import React from 'react'

const LoginModal = () => {
  return (
    <div className='loginmodal'>
      <div className='loginmodal__inner'>
        <div className="loginmodal__header">
          <h3 className='title'>간편 로그인</h3>
          <a href="#" className='close_btn'></a>
        </div>

        <div className="loginmodal__main">
          <div className="naver">
            <span className='icon'></span>
            <span className='text'>네이버로 시작</span>
          </div>
          <div className="facebook">
            <span className='icon'></span>
            <span className='text'>페이스북으로 시작</span>
          </div>

          <div className="user__login">
            <p className='title'>
              이메일 직접 로그인
            </p>
            <input id='userid' type='text' placeholder='이메일 주소' />
            <input id='userpw' type='password' placeholder='비밀번호(8자리 이상)' />
            <div className="user__login__footer">
              <input className='checkbox' type='checkbox' />
              <span>이메일저장</span>
              <a href="#">이메일/비밀번호찾기</a>
            </div>
            <button type='button' className='loginbtn'>로그인</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal