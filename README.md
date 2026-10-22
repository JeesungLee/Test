# 2026 안전점검 보고서 검색 웹페이지

## 구성
- `index.html`: 웹페이지
- `style.css`: 디자인 및 모바일 대응
- `app.js`: 데이터 로드, 장 카드 표시 및 제목/본문 실시간 검색
- `장데이터.json`: 제공된 원본 5장 데이터

## 로컬 실행
`index.html`을 더블클릭하는 대신 로컬 HTTP 서버를 실행하세요. 브라우저에서 `fetch('./장데이터.json')` 호출에 웹서버가 필요합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속. Node.js가 있다면 `npx serve .`도 가능합니다.

## Netlify 배포
Netlify Drop(https://app.netlify.com/drop)에 이 소스의 최상위 폴더(또는 ZIP 압축 해제 폴더)를 드래그 앤 드롭합니다. 발급된 `https://...netlify.app` URL을 제출물.md에 기록합니다.

## 검증
최초 5건 표시, '예산' 검색 시 해당 장 표시, 검색어 제거 시 5건 복귀, 없는 단어 입력 시 0건 및 빈 결과 메시지 표시.

참고: 이 보고서는 가상 자료입니다. 원본의 장별 수치가 서로 상이하더라도 자동 수정하지 않고 그대로 표시합니다.
