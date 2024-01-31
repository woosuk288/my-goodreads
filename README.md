# goodreads

- [x] [디자인 스크린샷 후 컴포넌트 쪼개기](<(https://www.figma.com/file/5gEzxwmNHwav14bwg6Ak3Q/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%AA%BC%EA%B0%9C%EA%B8%B0?type=design&node-id=37-99&mode=design&t=BjTAn795MOb39f0t-4)>)

- 로그인 UI 구현 (손풀기)
- 사용할 공통컴포넌트 (더 확인해보기...)
  [x] Header, Footer, Editor, Drawer
  [x] SearchBar
- [x] 폰트(Noto Sans KR) 및 공통 global css(a tag MUI link 및 버튼 기본 색상, layout 구성 위한 header main footer 길이) 적용

```

- [X] Home UI 구현하기
- [X] LoginForm 구현하기
- [X] SearchBook component 구현하기
- [X] 검색 결과 page UI 구현
- [X] 도서 상세 정보 및 커뮤니티 리뷰

```
- [ ] app-router로 migration

```


```

- [ ] 도서 API 확인 및 정리 (네이버, 카카오, 도서관 정보나루)

- [ ] 계정 생성과 로그인
- [ ] 도서 검색과 추가
- [ ] 도서 평가 및 리뷰 작성
- [ ] 기본적인 사용자 프로필 페이지
- [ ] 사용자 간의 독서 활동 피드
- [ ] 홈 - 비로그인, 로그인(피드)

## 🎨 Color Theme

| ![primary.light](https://via.placeholder.com/50/F4F1EA/000000?text=+) | **primary.light**<br/>#F4F1EA | ![primary.main](https://via.placeholder.com/50/382110/000000?text=+) | **primary.main**<br/>#382110 | ![primary.dark](https://via.placeholder.com/50/1E1915/000000?text=+) | **primary.dark**<br/>#1E1915 |
| --- | --- | --- | --- | --- | --- |
| ![secondary.light](https://via.placeholder.com/50/EBF0E5/000000?text=+) | **secondary.light**<br/>#EBF0E5 | ![secondary.main](https://via.placeholder.com/50/3F8363/000000?text=+) | **secondary.main**<br/>#3F8363 | ![secondary.dark](https://via.placeholder.com/50/00635D/000000?text=+) | **secondary.dark**<br/>#00635D |


## Style

- MUI component와 sx 속성을 기본으로 사용한다.
- sx 속성을 변수로 선언시 변수명 앞에 sx접두사를 붙인다. (ex, sxLoginButton)
- sx 속성 변수는 component, section, wrapper 단위에서 사용을 권한다.
