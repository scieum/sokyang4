/** @type {import('next').NextConfig} */

// GitHub Pages(프로젝트 페이지)는 /<repo> 하위 경로에서 서빙되므로,
// Actions 배포 시에만 basePath/assetPrefix를 적용한다. (로컬 dev/build에는 미적용)
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "sokyang4";

const nextConfig = {
  output: "export", // 정적 HTML 익스포트 (GitHub Pages 호스팅용)
  images: { unoptimized: true },
  ...(isPages
    ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` }
    : {}),
};

export default nextConfig;
