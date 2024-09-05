import React, { useState } from 'react'
import { regionBusan } from '@/data/regionBusan'
import { regionChungBuk } from '@/data/regionChungBuk'
import { regionChungNam } from '@/data/regionChungNam'
import { regionDaejeon } from '@/data/regionDaejeon'
import { regionGangwon } from '@/data/regionGangwon'
import { regionGwangju } from '@/data/regionGwangju'
import { regionGyeongBuk } from '@/data/regionGyeongBuk'
import { regionGyeonggi } from '@/data/regionGyeonggi'
import { regionGyeongNam } from '@/data/regionGyeongNam'
import { regionIncheon } from '@/data/regionIncheon'
import { regionDaegu } from '@/data/regionDaegu'
import { regionJeonBuk } from '@/data/regionJeonBuk'
import { regionJeonNam } from '@/data/regionJeonNam'
import { regionSejong } from '@/data/regionSejong'
import { regionSeoul } from '@/data/regionSeoul'
import { regionUlsan } from '@/data/regionUlsan'
import { regionJeju } from '@/data/regionJeju'



const AreaSearch = ({ content, setAreaSearchContent }) => {

  return (
    <section className="search">
      <input
        id='search__input'
        type='input'
        placeholder='검색어를 입력하세요'
      ></input>
      <div className="areaName">
        <button onClick={() => setAreaSearchContent('Gyeonggi')}>경기도</button>
        <button onClick={() => setAreaSearchContent('Gangwon')}>강원도</button>
        <button onClick={() => setAreaSearchContent('ChungBuk')}>충청북도</button>
        <button onClick={() => setAreaSearchContent('ChungNam')}>충청남도</button>
        <button onClick={() => setAreaSearchContent('JeonBuk')}>전라북도</button>
        <button onClick={() => setAreaSearchContent('JeonNam')}>전라남도</button>
        <button onClick={() => setAreaSearchContent('GyeongBuk')}>경상북도</button>
        <button onClick={() => setAreaSearchContent('GyeongNam')}>경상남도</button>
        <button onClick={() => setAreaSearchContent('Seoul')}>서울특별시</button>
        <button onClick={() => setAreaSearchContent('Incheon')}>인천광역시</button>
        <button onClick={() => setAreaSearchContent('Busan')}>부산광역시</button>
        <button onClick={() => setAreaSearchContent('Daegu')}>대구광역시</button>
        <button onClick={() => setAreaSearchContent('Gwangju')}>광주광역시</button>
        <button onClick={() => setAreaSearchContent('Daejeon')}>대전광역시</button>
        <button onClick={() => setAreaSearchContent('Ulsan')}>울산광역시</button>
        <button onClick={() => setAreaSearchContent('Sejong')}>세종특별자치시</button>
        <button onClick={() => setAreaSearchContent('Jeju')}>제주특별자치도</button>
      </div>
      <div>
        {content === 'Gyeonggi' && (
          <>
            {regionGyeonggi.map((regionGyeonggi, key) => (
              <div className='areaItem'>
                <button key={key}>{regionGyeonggi.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Gangwon' && (
          <>
            {regionGangwon.map((regionGangwon, key) => (
              <div className='areaItem'>
                <button key={key}>{regionGangwon.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'ChungBuk' && (
          <>
            {regionChungBuk.map((regionChungBuk, key) => (
              <div className='areaItem'>
                <button key={key}>{regionChungBuk.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'ChungNam' && (
          <>
            {regionChungNam.map((regionChungNam, key) => (
              <div className='areaItem'>
                <button key={key}>{regionChungNam.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'JeonBuk' && (
          <>
            {regionJeonBuk.map((regionJeonBuk, key) => (
              <div className='areaItem'>
                <button key={key}>{regionJeonBuk.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'JeonNam' && (
          <>
            {regionJeonNam.map((regionJeonNam, key) => (
              <div className='areaItem'>
                <button key={key}>{regionJeonNam.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'GyeongBuk' && (
          <>
            {regionGyeongBuk.map((regionGyeongBuk, key) => (
              <div className='areaItem'>
                <button key={key}>{regionGyeongBuk.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'GyeongNam' && (
          <>
            {regionGyeongNam.map((regionGyeongNam, key) => (
              <div className='areaItem'>
                <button key={key}>{regionGyeongNam.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Seoul' && (
          <>
            {regionSeoul.map((regionSeoul, key) => (
              <div className='areaItem'>
                <button key={key}>{regionSeoul.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Incheon' && (
          <>
            {regionIncheon.map((regionIncheon, key) => (
              <div className='areaItem'>
                <button key={key}>{regionIncheon.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Busan' && (
          <>
            {regionBusan.map((regionBusan, key) => (
              <div className='areaItem'>
                <button key={key}>{regionBusan.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Daegu' && (
          <>
            {regionDaegu.map((regionDaegu, key) => (
              <div className='areaItem'>
                <button key={key}>{regionDaegu.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Gwangju' && (
          <>
            {regionGwangju.map((regionGwangju, key) => (
              <div className='areaItem'>
                <button key={key}>{regionGwangju.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Daejeon' && (
          <>
            {regionDaejeon.map((regionDaejeon, key) => (
              <div className='areaItem'>
                <button key={key}>{regionDaejeon.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Ulsan' && (
          <>
            {regionUlsan.map((regionUlsan, key) => (
              <div className='areaItem'>
                <button key={key}>{regionUlsan.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Sejong' && (
          <>
            {regionSejong.map((regionSejong, key) => (
              <div className='areaItem'>
                <button key={key}>{regionSejong.name}</button>
              </div>
            ))}
          </>
        )}
        {content === 'Jeju' && (
          <>
            {regionJeju.map((regionJeju, key) => (
              <div className='areaItem'>
                <button key={key}>{regionJeju.name}</button>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default AreaSearch