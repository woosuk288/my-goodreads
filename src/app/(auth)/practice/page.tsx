"use client";

import "./practice.css";

import SearchBookList from "@/components/SearchBookList";

export default function test() {
  return (
    <div>
      <br />

      <SearchBookList onClose={() => {}} />

      <br />

      <ul className="menu">
        <li>
          <a href="#">사전</a>
        </li>
        <li>
          <a href="#">뉴스</a>
        </li>
        <li>
          <a href="#">증권</a>
        </li>
        <li>
          <a href="#">지도</a>
        </li>
      </ul>

      <br />

      <form method="post" action="fake_server.php">
        <fieldset>
          <legend>좋아하는 음식을 모두 고르세요</legend>
          <input type="checkbox" name="food" id="one" />
          <label htmlFor="one">제육볶음</label>
          <input type="checkbox" name="food" id="two" />
          <label htmlFor="two">돈까스</label>
          <input type="checkbox" name="food" id="three" />
          <label htmlFor="three">순대국밥</label>
        </fieldset>
        <fieldset>
          <legend>이름과 나이</legend>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" />
          <br />
          <label htmlFor="age">나이</label>
          <input type="number" id="age" name="age" disabled />
        </fieldset>
      </form>
    </div>
  );
}
