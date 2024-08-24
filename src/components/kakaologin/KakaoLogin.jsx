import { getToken } from '@/app/api/token/getToken'
import Link from 'next/link'
import React, { useEffect } from 'react'


const KakaoLogin = ({ onLoginSuccess }) => {

  useEffect(() => {
    // Redirect_URI로 인가코드 전달받은 코드
    const search = new URLSearchParams(window.location.search);
    // 인가코드의 code= 다음 뒷부분
    const code = search.get('code');
    const accessToken = localStorage.getItem('access_token')
    if (code && (!accessToken || accessToken === 'undefined')) { // 2. 카카오로부터 리다이렉트 당한 경우 code
      // POST, oauth / token을 날린다
      handleGetToken();
    }
  }, []) // 최초 진입시 발동(1. 찐 최초 / 2. 카카오로부터 리다이렉트 당해서 진입)

  const handleGetToken = async () => {
    // 본래라면 여기서 백엔드 서버 요청 => 그 백엔드 서버에서 또 카카오로 요청 하지만
    // 나는 프론트에서 바로 카카오로 날림
    const {
      token_type,
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in
    } = await getToken();

    localStorage.setItem('access_token', access_token)

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  }

  const authParam = new URLSearchParams({
    client_id: '32a92ed3ece50a34d8287d91e7fbce9e',
    redirect_uri: 'http://localhost:3000/',
    response_type: 'code'
  })

  return (
    <div className='kakao'>
      <Link href={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`} className='text'>카카오톡으로 시작</Link>
    </div>
  )
}

export default KakaoLogin