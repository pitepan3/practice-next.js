import React, { useState } from 'react';
import AreaSearch from '../search/AreaSearch';

const Sidebar = ({
  content,
  setSidebarContent,
  isSidebarVisible,
  showSidebar,
  onClose,
  setCenter,
  infoWindowContent
}) => {
  const [areaSearchContent, setAreaSearchContent] = useState('');
  const [isAreaSearchHidden, setAreaSearchHidden] = useState(false);
  const [isAreaSearchItemHidden, setAreaSearchItemHidden] = useState(false);

  return (
    <>
      <section className='nav'>
        <div className='nav__inner'>
          <button
            onClick={() => { setSidebarContent('default'); showSidebar(); }}
            className='item'
            type='button'>
            검색
          </button>
          <button
            onClick={() => { setSidebarContent('myHouse'); showSidebar(); }}
            className='item'
            type='button'>
            우리집
          </button>
        </div>
      </section>
      <section className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
        <button className='closeBtn' onClick={() => onClose()}>숨기기</button>
        {content === 'default' && (
          <AreaSearch
            content={areaSearchContent}
            setAreaSearchContent={setAreaSearchContent}
            isAreaSearchHidden={isAreaSearchHidden}
            onClose={() => setAreaSearchHidden(true)}
            showArea={() => setAreaSearchHidden(false)}
            isAreaSearchItemHidden={isAreaSearchItemHidden}
            onCloseItem={() => setAreaSearchItemHidden(true)}
            showItem={() => setAreaSearchItemHidden(false)}
            setCenter={setCenter}
          />
        )}
        {content === 'myHouse' && (
          <div className="sidebar__myHouse">
            <div className='userName' dangerouslySetInnerHTML={{ __html: infoWindowContent }} />
          </div>
        )}
      </section>
    </>
  );
};

export default Sidebar;