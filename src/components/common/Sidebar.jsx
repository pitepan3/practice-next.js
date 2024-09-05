import React, { useState } from 'react';
import AreaSearch from '../search/AreaSearch';

const Sidebar = ({
  content,
  setSidebarContent
}) => {
  const [areaSearchContent, setAreaSearchContent] = useState('');

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
          <AreaSearch 
            content={areaSearchContent}
            setAreaSearchContent={setAreaSearchContent}
          />
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