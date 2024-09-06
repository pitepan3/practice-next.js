import React, { useState } from 'react'
import { regionTitle } from '@/data/regionTitle'
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


const AreaSearch = ({
  content,
  setAreaSearchContent,
  isAreaSearchHidden,
  onClose,
  showArea,
  isAreaSearchItemHidden,
  onCloseItem,
  showItem
}) => {

  return (
    <section className="search">
      <input
        id='search__input'
        type='input'
        placeholder='검색어를 입력하세요'
      />
      <button
        className='returnArea'
        onClick={() => { showArea(); onCloseItem(); }}
      >
        도/시 다시 선택하기
      </button>
      <div className={`areaName ${isAreaSearchHidden ? 'hidden' : ''}`}>
        {regionTitle.map((regionTitle, key) => (
          <button
            key={key}
            onClick={() => { setAreaSearchContent(`${regionTitle.engName}`); onClose(); showItem() }}
          >
            {regionTitle.koName}
          </button>
        ))}
      </div>
      <div>
        {content === 'Gyeonggi' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionGyeonggi.map((regionGyeonggi, key) => (
              <button key={key}>{regionGyeonggi.name}/{regionGyeonggi.center}</button>
            ))}
          </div>
        )}
        {content === 'Gangwon' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionGangwon.map((regionGangwon, key) => (
              <button key={key}>{regionGangwon.name}</button>
            ))}
          </div>
        )}
        {content === 'ChungBuk' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionChungBuk.map((regionChungBuk, key) => (
              <button key={key}>{regionChungBuk.name}</button>
            ))}
          </div>
        )}
        {content === 'ChungNam' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionChungNam.map((regionChungNam, key) => (
              <button key={key}>{regionChungNam.name}</button>
            ))}
          </div>
        )}
        {content === 'JeonBuk' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionJeonBuk.map((regionJeonBuk, key) => (
              <button key={key}>{regionJeonBuk.name}</button>
            ))}
          </div>
        )}
        {content === 'JeonNam' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionJeonNam.map((regionJeonNam, key) => (
              <button key={key}>{regionJeonNam.name}</button>
            ))}
          </div>
        )}
        {content === 'GyeongBuk' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionGyeongBuk.map((regionGyeongBuk, key) => (
              <button key={key}>{regionGyeongBuk.name}</button>
            ))}
          </div>
        )}
        {content === 'GyeongNam' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionGyeongNam.map((regionGyeongNam, key) => (
              <button key={key}>{regionGyeongNam.name}</button>
            ))}
          </div>
        )}
        {content === 'Seoul' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionSeoul.map((regionSeoul, key) => (
              <button key={key}>{regionSeoul.name}</button>
            ))}
          </div>
        )}
        {content === 'Incheon' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionIncheon.map((regionIncheon, key) => (
              <button key={key}>{regionIncheon.name}</button>
            ))}
          </div>
        )}
        {content === 'Busan' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionBusan.map((regionBusan, key) => (
              <button key={key}>{regionBusan.name}</button>
            ))}
          </div>
        )}
        {content === 'Daegu' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionDaegu.map((regionDaegu, key) => (
              <button key={key}>{regionDaegu.name}</button>
            ))}
          </div>
        )}
        {content === 'Gwangju' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionGwangju.map((regionGwangju, key) => (
              <button key={key}>{regionGwangju.name}</button>
            ))}
          </div>
        )}
        {content === 'Daejeon' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionDaejeon.map((regionDaejeon, key) => (
              <button key={key}>{regionDaejeon.name}</button>
            ))}
          </div>
        )}
        {content === 'Ulsan' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionUlsan.map((regionUlsan, key) => (
              <button key={key}>{regionUlsan.name}</button>
            ))}
          </div>
        )}
        {content === 'Sejong' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionSejong.map((regionSejong, key) => (
              <button key={key}>{regionSejong.name}</button>
            ))}
          </div>
        )}
        {content === 'Jeju' && (
          <div className={`areaItem ${isAreaSearchItemHidden ? 'hidden' : ''}`}>
            {regionJeju.map((regionJeju, key) => (
              <button key={key}>{regionJeju.name}</button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AreaSearch