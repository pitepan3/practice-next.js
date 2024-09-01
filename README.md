** 부동산 시세 알아보는 사이트 만들기 **


- 기술스텍
  React
  서버관리: Next.js
  상태관리: zustand
  API통신: Axios
  CSS: scss

- 컨벤션
  -코드 컨벤션
    ESlint 
    Prettier
  Git
  feature/기능/동훈or세영
  등등

- 구현기능
  - 회원가입, 로그인
  - 부동산 검색기능
  - 실시간 시세 정보 제공
  - 관심 매물 저장(즐겨찾기? 북마크?)
  - 카카오맵api를 이용한 검색기능

- 레퍼런스
  - https://www.bdsplanet.com/map/realprice_map.ytp(부동산플래닛)
  - https://kbland.kr/map(KB부동산)
  - https://asil.kr/asil/index.jsp(아실)

  최적화 진행하기

  ========== 24.09.01 피드백 ==========

// Javascript ES6 문법 (ECMA >> 확달라졌어 자바스크립트 자체가)
// 1. async await 문법 >> 동기화 처리를 위함 (?) >> 자바스크립트 자체가, 비동기적으로 작동하기 때문에, 선언적으로 async await 문법을 통해 처리 해야 한다.
// 2. arrow function 지원
// 3. class 지원 (객체지향 프로그래밍이 가능).
// 4. Promise 객체 공부 필요
// 5. 스프레딩 오퍼레이터 const arr = arr2.concat(arr1)
//    --> const arr = [...arr2, ...arr1];
// ( !!!ES6(ECMA)!!! 부터 생김, ES5 ... ES..4 XXX )

// React Query >> 리액트에서 데이터 fetch 할때 편하게 할 수 있는건데 + (캐시기능 기본적으로 포함) (useCallback)
// 성능 상승 되고.
// React Rendering 관점에서 보면 Memozation(useMemo())

// *
// * a.js line 560 function test(){
// }
// Compiler가 지금 너는 b.js에서 line 1000 test() 호출하게됨.
// 1. import 된것들 중에 test() 함수가 존재하는지 찾아 (import 된게 20개 1000줄씩 이걸 다 찾아. 첫발견 test함수를 타겟으로 잡는거야) c.js에 test함수를 호출하고 싶었는데
// 2. a.js에서 560번줄 까지 가야되. 가서 test함수의 text를 다 긁어와 { ... } 메모리에 올려
// 3. test함수를 100번 호출했어 (1~2 찾아서 긁어와서 메모리에 적재까지 100번 반복하는거야)
// 4. useCallback >> React 내부에 callback 함수로 등록을해 const callback1 = useCallback(() => {}); useCallback이라는 함수 자체의 리턴값이 너가 넘겨준 콜백함수의 리턴

// useMemo >> const data = useMemo(() => return [...a, ...b]);
// (Server) --> (Cache memory) --> (Client) ?? 아니 그러면, 서버에 요청할지 캐시메모리에 요청할지는 누가 정함?
// Proxy(대리인) Client 입장에서는 Cache Memory 랑 Server 랑 같애....
// 리액트 쿼리 적용 바람 /estate/data 전체

  ========== 24.09.01 피드백 ==========