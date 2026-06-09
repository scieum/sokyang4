// 네이버 지도 연계 (Phase 1: API 키 없이 동작하는 검색 딥링크)
//
// 실제 Naver Maps JS API는 클라이언트 ID가 필요하고 정적 배포(GitHub Pages)에서
// 키 노출 없이 쓰기 어렵다. 따라서 MVP는 장소명+주소로 네이버 지도 검색 페이지를
// 여는 딥링크로 연계한다. Phase 2에서 실제 지도 임베드/Place ID로 고도화한다.

// 지도 검색은 "상호명"만으로 질의한다. (주소를 함께 넣으면 지도 검색이
// 주소 문자열까지 매칭하려다 결과가 빗나가는 문제가 있어 이름만 사용)

/** 네이버 지도 검색 딥링크 URL 생성 */
export function naverMapUrl(name: string): string {
  return `https://map.naver.com/p/search/${encodeURIComponent(name)}`;
}

/** 구글 지도 검색 딥링크 URL 생성 */
export function googleMapUrl(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
}

/** 네이버 이미지 검색 딥링크 (큐레이션 사진이 없을 때 폴백) */
export function naverImageSearchUrl(query: string): string {
  return `https://search.naver.com/search.naver?where=image&query=${encodeURIComponent(query)}`;
}

/** 구글 이미지 검색 딥링크 */
export function googleImageSearchUrl(query: string): string {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}
