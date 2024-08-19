import React from 'react'

const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='header__logo'></div>
        <ul className='header__menu'>
          <li className='item'>HOME</li>
          <li className='item'>실거래가조회</li>
          <li className='item'>실거래가조회</li>
          <li className='item'>실거래가조회</li>
        </ul>
        <ul className='header__login'>
          <li className='item'>로그인</li>
          <li className='item'>회원가입</li>
        </ul>
      </div>
    </>
  )
}

export default Header