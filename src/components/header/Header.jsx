import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = ({ showLogin, showSignup }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(token);
  }, [])


  // 로컬스토리지에 회원 토큰 삭제
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  }

  const logoutParam = new URLSearchParams({
    client_id: '32a92ed3ece50a34d8287d91e7fbce9e',
    logout_redirect_uri: 'http://localhost:3000'
  })

  return (
    <div className='header'>
      <div className='header__logo'></div>

      <ul className='header__menu'>
        <li className='item'>HOME</li>
        <li className='item'>실거래가조회</li>
        <li className='item'>실거래가조회</li>
        <li className='item'>실거래가조회</li>
      </ul>

      <ul className='header__login'>
        {isLoggedIn ? (
          <>
            <Link
              className='logoutBtn'
              href={`https://kauth.kakao.com/oauth/logout?${logoutParam.toString()}`}
              onClick={handleLogout}
            >
              로그아웃
            </Link>
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