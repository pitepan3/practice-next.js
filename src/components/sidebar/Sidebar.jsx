import React from 'react'

const Sidebar = ({ isSidebarVisible, showSidebar, hideSidebar }) => {
  return (
    <>
      <div className='nav'>
        <div className='nav__inner'>
          <button onClick={showSidebar} className='item homeBtn' type='button'>홈</button>
          <button onClick={hideSidebar} className='item mapBtn' type='button'>지도</button>
          <button className='item' type='button'>우리집</button>
          <button className='item' type='button'>btn</button>
          <button className='item' type='button'>btn</button>
        </div>
      </div>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar__search">
          <input type='text' placeholder='검색어를 입력하세요'></input>
        </div>
        <div className="sidebar__area">
          <span>경기도</span>
          <span>강원도</span>
          <span>충청북도</span>
          <span>충청남도</span>
          <span>전라북도</span>
          <span>전라남도</span>
          <span>경상북도</span>
          <span>경상남도</span>
          <span>서울광역시</span>
          <span>인천광역시</span>
          <span>부산광역시</span>
          <span>대구광역시</span>
          <span>광주광역시</span>
          <span>대전광역시</span>
          <span>울산광역시</span>
          <span>세종특별시</span>
          <span>제주도</span>
        </div>
      </div>
    </>
  )
}

export default Sidebar