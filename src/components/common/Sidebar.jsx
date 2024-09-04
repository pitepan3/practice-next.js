import React from 'react';
import Search from '../search/Search';

const Sidebar = ({
  content,
  setSidebarContent
}) => {

  return (
    <>
      <section className='nav'>
        <div className='nav__inner'>
          <button onClick={() => setSidebarContent('default')} className='item' type='button'>검색</button>
          <button onClick={() => setSidebarContent('myHouse')} className='item' type='button'>우리집</button>
        </div>
      </section>
      <section className='sidebar'>
        {content === 'default' && (
          <Search />
        )}
        {content === 'myHouse' && (
          <div className="sidebar__myHouse">
            <div className='userName'>
              myHouse
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Sidebar;