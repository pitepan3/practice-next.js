import React from 'react'
import { signOut } from 'next-auth/react'

const Header = ({ isLoggedIn, showLogin, showSignup }) => {

  return (
    <div className='header'>
      <div className='header__logo'></div>

      <ul className='header__menu'>
        <li className='item'>HOME</li>
        <li className='item'>실거래가조회</li>
        <li className='item'>실거래가조회</li>
      </ul>

      <ul className='header__login'>
        {isLoggedIn ? (
          <>
            <button
              onClick={() => signOut()}
              className='logoutBtn'
            >
              로그아웃
            </button>
            <a onClick={showSignup} className='signupBtn'>회원가입</a>

          </>
        ) : (
          <>
            <a onClick={showLogin} className='loginBtn'>로그인</a>
            <a onClick={showSignup} className='signupBtn'>회원가입</a>
          </>
        )}
      </ul>
    </div>
  )
}

export default Header