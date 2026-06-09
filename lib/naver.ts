// 네이버 지도 연계 (Phase 1: API 키 없이 동작하는 검색 딥링크)
//
// 실제 Naver Maps JS API는 클라이언트 ID가 필요하고 정적 배포(GitHub Pages)에서
// 키 노출 없이 쓰기 어렵다. 따라서 MVP는 장소명+주소로 네이버 지도 검색 페이지를
// 여는 딥링크로 연계한다. Phase 2에서 실제 지도 임베드/Place ID로 고도화한다.

/** 네이버 지도 검색 딥링크 URL 생성 */
export function naverMapUrl(name: string, address?: string): string {
  const query = address ? `${name} ${address}` : name;
  return `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
}
