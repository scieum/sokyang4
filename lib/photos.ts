// 갤러리 예시(대표) 이미지 생성
//
// 출처가 검증된 실제 매장 사진이 없을 때, 카테고리(메뉴/인테리어/외관)에 맞는
// "예시 이미지"를 보여 주어 화면 완성도를 확보한다. 실제 매장 사진이 아니므로
// UI에서 반드시 "예시 이미지"로 표기하고, 실제 사진은 검색 링크로 안내한다.
//
// loremflickr 의 키워드 + lock 파라미터로 카테고리에 맞는 안정적 이미지를 받는다.

import type { PhotoCategory, Restaurant } from "@/types";

const COUNT = 6;

const KEYWORDS: Record<PhotoCategory, string> = {
  menu: "korean,food",
  interior: "restaurant,interior",
  exterior: "restaurant,storefront",
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** 카테고리에 맞는 예시 이미지 URL 목록 (가게별로 다른 조합, 안정적) */
export function representativePhotos(
  r: Restaurant,
  category: PhotoCategory,
): string[] {
  const base = hash(r.id + category);
  return Array.from({ length: COUNT }, (_, i) => {
    const lock = (base + i * 97) % 100000;
    return `https://loremflickr.com/600/600/${KEYWORDS[category]}?lock=${lock}`;
  });
}
