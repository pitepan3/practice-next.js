import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const Header = ({ isLoggedIn, showLogin, showSignup }) => {

  return (
    <section className='header'>
      <span className='header__logo'></span>

      <div className='header__menu'>
        <Link href={'/'} className='item'>Project Name</Link>
      </div>

      <div className='header__login'>
        {isLoggedIn ? (
          <>
            <Link href={`/myPage`} className='myPageBtn'>마이페이지</Link>
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
      </div>
    </section>
  )
}

export default Header