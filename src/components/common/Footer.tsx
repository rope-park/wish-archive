/**
 * Footer 컴포넌트
 * 
 * 사이트 하단 푸터
 * - 저작권, 링크 등
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* 왼쪽: 프로젝트 정보 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">NCT WISH Archive</h3>
            <p className="text-sm text-gray-600">
              NCT WISH의 모든 활동을 기록하는 아카이브
            </p>
          </div>

          {/* 중앙: 링크 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">링크</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/nctwish_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/NCTsmtown_WISH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@NCTWISH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* 오른쪽: 추가 정보 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">About</h4>
            <p className="text-xs text-gray-500">
              이 사이트는 팬이 만든 비공식 아카이브입니다.
              <br />
              모든 콘텐츠의 저작권은 해당 권리자에게 있습니다.
            </p>
          </div>
        </div>

        {/* 하단: 저작권 */}
        <div className="mt-8 border-t pt-6 text-center text-xs text-gray-500">
          <p>© {currentYear} NCT WISH Archive. All rights reserved.</p>
          <p className="mt-1">
            Made with ❤️ by NCTzen WISH
          </p>
        </div>
      </div>
    </footer>
  );
}
