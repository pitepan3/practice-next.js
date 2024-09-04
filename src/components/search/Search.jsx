import React from 'react'

const Search = () => {
  return (
    <section className='search'>
      <div className="search__inner">
        <input
          type='text'
          placeholder='검색어를 입력하세요'
        />
        <button className='searchBtn'></button>
        <div className="">
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
    </section>
  )
}

export default Search