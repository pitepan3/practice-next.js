// 카카오로 날리는 api => 여기 진입했다는 것은 앞에 쏜 API가 성공해서
// 이런 형태로 다시 카카오가 리다이렉트 한 상황임 
// https://localhost:3000/login_kakao?code=9R1JuJ5yYD3oVxZmHdMtjec_fPP01ySbDzXgZQp75sXCuSnpWFx5pgAAAAQKPXKYAAABkXQ0MqT6Fwx8Dt1GgQ

// 우리는 저 code 추출해서 다시 토큰 받기 api 쏠거다
export const getToken = async () => {
  const search = new URLSearchParams(window.location.search);
  const code = search.get('code');

  if(!code) {
    return {};
  }

  // 본격적인 카카오 API 호출
  const param = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: '32a92ed3ece50a34d8287d91e7fbce9e',
    redirect_uri: 'https://localhost:3000/login_kakao',
    code
  })

  const response = fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body:  param
  })

  const result = await response.json();
  console.log("result: ", result)
  return result;
}

export default getToken