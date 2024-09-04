import React from 'react'

const Search = () => {
  return (
    <section className="search">
      <input
        id='search__input'
        type='input'
        placeholder='검색어를 입력하세요'
      ></input>
      <div className="areaName">
        <a>경기도</a>
        <a>강원도</a>
        <a>충청북도</a>
        <a>충청남도</a>
        <a>전라북도</a>
        <a>전라남도</a>
        <a>경상북도</a>
        <a>경상남도</a>
        <a>서울특별시</a>
        <a>인천광역시</a>
        <a>부산광역시</a>
        <a>대구광역시</a>
        <a>광주광역시</a>
        <a>대전광역시</a>
        <a>울산광역시</a>
        <a>세종특별자치시</a>
        <a>제주특별자치도</a>
      </div>
    </section>
  )
}

export default Search