import React from 'react'

const Header = ({ toggleLogin, toggleSignup }) => {
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
        <a onClick={toggleLogin} id='loginBtn' className='item'>로그인</a>
        <a onClick={toggleSignup} id='signupBtn' className='item'>회원가입</a>
      </ul>
    </div>
  )
}

export default Header