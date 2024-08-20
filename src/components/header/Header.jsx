import React from 'react'
import Link from 'next/link'

const Header = () => {
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
        <Link href="/login" id='loginBtn' className='item'>로그인</Link>
        <Link href="/signup" id='signupBtn' className='item'>회원가입</Link>
      </ul>
    </div>
  )
}

export default Header