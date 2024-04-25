# Hwitter

## 🔗 배포 링크

[https://hwitter-5e2c0.web.app/](https://hwitter-5e2c0.web.app/)

## 📓 프로젝트 소개

Nomad Coders에서 트위터 클론코딩 컨테스트가 열리는 것을 알게 되었고 참여하게 되었습니다. 컨테스트에 참여하면서 혼자 기획, 디자인, 개발(풀스택), 배포까지 하면서 나만의 SNS 서비스를 만들고 배포하기까지의 사이클을 다시 경험할 수 있었습니다.
✨ [Nomad Coders 트위터 클론코딩 컨테스트 5기 우수작 선정](https://nomadcoders.co/community/thread/9744)
📑 [컨테스트 중 작성한 개발일지](https://nomadcoders.co/community/thread/9728)

## 📅 개발 기간

> 컨테스트 기간(1차 구현): `2024/3/29` ~ `2024/4/11`
> 2차 구현 기간: `2024/4/12` ~ `2024/4/25`

## 🛠 사용 기술

✅ Frontend: `React.js` `TypeScript` `React-Router-DOM` `Styled-Components`
✅ Backend: `Firebase`
✅ Build: `Vite`
✅ Deploy: `Firebase Hosting`

## ⚙ 기능 소개

### 1차 MVP

- [x] Firebase 소셜 로그인: Email, Google 로그인 구현
- [x] 실시간 게시물: 타임라인에 글을 작성하고 글의 작성자가 게시물을 수정, 삭제 가능
- [x] 사용자 프로필: 사용자의 프로필 페이지에서 사용자의 프로필 사진과 닉네임 수정 가능
- [x] 사용자 작성 게시물 조회: 프로필 페이지에서 사용자가 작성한 글 조회 가능
- [x] 사진만 따로 모아볼 수 있는 `Photos` 페이지 구현
- [x] 모바일 반응형 구현

### 2차 추가 구현

- [x] 게시물에 대한 좋아요, 북마크 가능
- [x] 게시물에 대한 답글(댓글) 기능
- [x] 게시물 클릭 시 상세화면에서 해당 게시물과 그에 대한 답글 조회
- [x] `Photos` 페이지에서 사진 클릭 시 그 사진이 게시된 게시물 상세 페이지로 이동

### 추가로 구현 또는 개선하고 싶은 점

- [ ] 실시간 업데이트의 성능 개선
