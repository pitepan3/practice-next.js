import React from 'react'
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
import { regionDaegu } from '@/data/regionInDaegu'
import { regionJeonBuk } from '@/data/regionJeonBuk'
import { regionJeonNam } from '@/data/regionJeonNam'
import { regionSejong } from '@/data/regionSejong'
import { regionSeoul } from '@/data/regionSeoul'
import { regionUlsan } from '@/data/regionUlsan'
import { regionJeju } from '@/data/regionJeju'


const Search = () => {
  return (
    <section className="search">
      <input
        id='search__input'
        type='input'
        placeholder='검색어를 입력하세요'
      ></input>
      <div className="areaName">
        <button>경기도</button>
        <button>강원도</button>
        <button>충청북도</button>
        <button>충청남도</button>
        <button>전라북도</button>
        <button>전라남도</button>
        <button>경상북도</button>
        <button>경상남도</button>
        <button>서울특별시</button>
        <button>인천광역시</button>
        <button>부산광역시</button>
        <button>대구광역시</button>
        <button>광주광역시</button>
        <button>대전광역시</button>
        <button>울산광역시</button>
        <button>세종특별자치시</button>
        <button>제주특별자치도</button>
      </div>
    </section>
  )
}

export default Search