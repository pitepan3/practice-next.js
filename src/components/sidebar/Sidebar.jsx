import React from 'react';

const Sidebar = ({
  isSidebarVisible,
  showSidebar,
  hideSidebar,
  content,
  setSidebarContent,
  searchQuery,
  setSearchQuery,
  handleSearch
}) => {

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSearch()
    }
  }


  return (
    <>
      <section className='nav'>
        <div className='nav__inner'>
          <button onClick={() => { showSidebar(); setSidebarContent('default'); }}
            className='item' type='button'>검색</button>
          <button onClick={hideSidebar} className='item' type='button'>지도</button>
          <button onClick={() => { showSidebar(); setSidebarContent('myHouse'); }} className='item' type='button'>우리집</button>
          <button onClick={() => { showSidebar(); setSidebarContent('findRealPrices'); }} className='item' type='button'>실거래가조회</button>
          <button onClick={() => { showSidebar(); setSidebarContent('estateProperty'); }} className='item' type='button'>매물</button>
        </div>
      </section>
      <section className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {content === 'default' && (
          <div className="sidebar__search">
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className='searchBtn' onClick={handleSearch}></button>
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
        )}
        {content === 'myHouse' && (
          <div className="sidebar__myHouse">
            <div className='userName'>
              myHouse
            </div>
          </div>
        )}
        {content === 'findRealPrices' && (
          <div className="sidebar__findRealPrices">
            <div className='userName'>
              findRealPrices
            </div>
          </div>
        )}
        {content === 'estateProperty' && (
          <div className="sidebar__estateProperty">
            <div className='userName'>
              estateProperty
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Sidebar;