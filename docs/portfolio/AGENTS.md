# 에이전트 핸드오프 가이드 — 포트폴리오 리뉴얼

## 읽는 순서
1. `INTERVIEW.md` — 원천 데이터(본인 발언)
2. `ANALYSIS.md` — 인물 분석, 관계도, 히어로 카피 후보, 서사 아웃라인
3. `RESUME.md` — 경력 전체(★ = 부각)
4. `DESIGN_DIRECTION.md` — 레퍼런스와 페이지 구조
5. 루트 `README.md`, `ADDING_PROJECT.md`, `data/projects.js`

## 원칙
- 목표는 "작업물 나열"이 아니라 **사람과 철학을 보여주는 포트폴리오**. 대상: 업계 실무자·디자이너·HR.
- 본인 표현을 우선. 사실을 만들어내지 말 것(추정은 표시하고 확인 요청).

## Do
- 정적 GitHub Pages 유지(빌드 없음, `.github/workflows/deploy.yml`이 레포 루트 전체를 배포).
- `data/projects.js` 데이터 주도 구조와 `ADDING_PROJECT.md` 흐름 유지(필드 추가 시 하위 호환 + 문서 갱신).
- 라이트/다크, 모바일 320px, `keep-all`, 접근성, `prefers-reduced-motion`.

## Don't
- 주소·전화번호·생년월일·이메일 등 **개인 연락처 커밋 금지**. 경력기술서 원본 PDF/이미지 커밋 금지.
- 라임리를 성공작처럼 포장 금지(교훈으로 솔직하게).
- `docs/`는 Pages로 함께 공개됨을 기억할 것.

## 사용자에게 확인할 것 (미결정)
- [ ] 히어로 카피 최종 선택(`ANALYSIS.md` 후보 5개)
- [ ] 히어로 이미지: 본인 촬영 사진(캠핑·여행 등) 사용 가능 여부 / 스톡 사용 여부
- [ ] 연락처(이메일) 공개 여부
- [ ] 라임리 공개 범위(링크/스크린샷 유무)
- [ ] 렛츠 캠핑·픽·헤어의 제작 계기 확인
- [ ] 크레소티 재직 중임을 사이트에 표시할지
- [ ] 영문 병기 여부, 도메인

## 다음 단계
- [ ] 사용자 결정 사항 수집
- [ ] `data/projects.js`에 `intent / why / benefit` 필드 추가(옵션, 기존 렌더 유지)
- [ ] 라임리 항목 추가(status 예: 'archived')
- [ ] Hero → Narrative → Career → Projects 섹션 구현
- [ ] 온톨로지 연결 시각화 인터랙션
- [ ] Lighthouse·모바일 점검 후 main 푸시, Actions 배포 확인
