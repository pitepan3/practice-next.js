import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='find'>
      <Link href='/'>
        <div className='logo'></div>
      </Link>
      <div className='find__container'>
        <div className='find__id'>
          <div className='find__id__header'>
            <h2 className='title'>ID찾기</h2>
            <p className='desc'>ID를 찾기 위한 본인확인 방법을 선택해주세요</p>
          </div>

          <div className='find__id__main'>
            <div className='phone'>
              <div className='left'>
                <h3>휴대폰 인증</h3>
                <p>고객님 명의의 휴대폰으로 인증</p>
              </div>
              <button type='button'>
                인증하기
              </button>
            </div>
            <div className='kakao'>
              <div className='left'>
                <h3>카카오톡 인증</h3>
                <p>고객님 명의의 카카오톡으로 인증</p>
              </div>
              <button type='button'>
                인증하기
              </button></div>
          </div>
        </div>

        <div className='find__pw'>
          <div className='find__pw__header'>
            <h2 className='title'>비밀번호 찾기</h2>
            <p className='desc'>비밀번호를 찾기 위한 ID를 입력해주세요</p>
          </div>

          <div className='find__pw__main'>
            <div className='card'>
              <p>ID</p>
              <input type='text' placeholder='ID를 입력하세요' />
            </div>
            <button>다음</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page