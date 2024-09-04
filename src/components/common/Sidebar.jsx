import React from 'react';

const Sidebar = ({
  content,
  setSidebarContent
}) => {

  return (
    <>
      <section className='nav'>
        <div className='nav__inner'>
          <button onClick={() => setSidebarContent('default')} className='item' type='button'>default</button>
          <button onClick={() => setSidebarContent('myHouse')} className='item' type='button'>우리집</button>
          <button onClick={() => setSidebarContent('findRealPrices')} className='item' type='button'>실거래가조회</button>
        </div>
      </section>
      <section className='sidebar'>
        {content === 'default' && (
          <div className="sidebar__default">
            <div className='userName'>
              default
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
      </section>
    </>
  );
};

export default Sidebar;