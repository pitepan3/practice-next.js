// 카카오로 날리는 api => 여기 진입했다는 것은 리다이렉트 URI로 인가코드를 받았다는 뜻
// 우리는 저 code 추출해서 다시 토큰 받기 api를 사용할것이다
export const getToken = async () => {
  const search = new URLSearchParams(window.location.search);
  const code = search.get('code');
  
  if (!code) {
    return {};
  }

  const param = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: '32a92ed3ece50a34d8287d91e7fbce9es',
    redirect_uri: 'http://localhost:3000/',
    code
  })

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: param
  })

  const result = await response.json();
  console.log('result: ', result)
  return result;
}