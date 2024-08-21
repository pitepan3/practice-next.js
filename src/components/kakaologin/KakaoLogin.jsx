import getToken from '@/app/api/api'
import Link from 'next/link'
import React, { useEffect } from 'react'

const client_id = '32a92ed3ece50a34d8287d91e7fbce9e'
const redirect_uri = 'https://localhost:3000/login_kakao'
const response_type = 'code'

const KakaoLogin = () => {
  // 만약 백엔드가 있는 경우: 백엔드에서 카카오로 호출하는 api

  // 카카오로부터 값을 받으면 /codd=....... 형태로 옴
  // => code=.......형태인 경우 : 카카오로부터 인가 코드 받은 것으로 판단

  useEffect(() => {
    const search = new URLSearchParams(window.location.search); // https://localhost:3000/login_kakao?code=9R1JuJ5yYD3oVxZmHdMtjec_fPP01ySbDzXgZQp75sXCuSnpWFx5pgAAAAQKPXKYAAABkXQ0MqT6Fwx8Dt1GgQ

    const code = search.get("code"); // 9R1JuJ5yYD3oVxZmHdMtjec_fPP01ySbDzXgZQp75sXCuSnpWFx5pgAAAAQKPXKYAAABkXQ0MqT6Fwx8Dt1GgQ
    const accessToken = localStorage.getItem('access_token')

    // 카카오로부터 리다이렉트 당한 경우 code가 들어있을듯..
    if (code && !accessToken || accessToken === 'undefined') {
      // POST / oauth / token을 날린다.(원래는 서버에서 하는것임)
      handleGetToken();
    }
  }, []); // 최초 진입시 발동(1. 찐 최초 / 2. 카카오로부터 리다이렉트 당해서 진입)

  const handleGetToken = async () => {
    // 본래라면 여기서 백엔드 서버 요청 => 그 백엔드 서버에서 또 카카오로 요청...
    // 나는 프론트에서 바로 카카오로 날림
    const {
      token_type,
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
    } = await getToken();

    localStorage.setItem('access_token', access_token)
  }

  const authParam = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type
  })
  return (
    <div className='kakao'>
      <Link href={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`} className='text'>카카오톡으로 시작</Link>
    </div>
  )
}

export default KakaoLogin