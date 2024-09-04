import React from 'react';

import Map from '../map/Map';

const Sidebar = ({
  content,
  setSidebarContent
}) => {

  return (
    <>
      <section className='nav'>
        <div className='nav__inner'>
          <button onClick={() => setSidebarContent('default')}
            className='item' type='button'>검색</button>
          <button onClick={() => setSidebarContent('myHouse')} className='item' type='button'>우리집</button>
          <button onClick={() => setSidebarContent('findRealPrices')} className='item' type='button'>실거래가조회</button>
          <button onClick={() => setSidebarContent('estateProperty')} className='item' type='button'>매물</button>
        </div>
      </section>
      <section className='sidebar'>
        {content === 'default' && (
          <div className="sidebar__search">
            <input
              type='text'
              placeholder='검색어를 입력하세요'
            />
            <button className='searchBtn'></button>
            <div className="sidebar__area">
              <span>경기도</span>
              <span>강원도</span>
              <span>충청북도</span>
              <span>충청남도</span>
              <span>전라북도</span>
              <span>전라남도</span>
              <span>경상북도</span>
              <span>경상남도</span>
              <span>서울특별시</span>
              <span>인천광역시</span>
              <span>부산광역시</span>
              <span>대구광역시</span>
              <span>광주광역시</span>
              <span>대전광역시</span>
              <span>울산광역시</span>
              <span>세종특별자치시</span>
              <span>제주특별자치도</span>
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