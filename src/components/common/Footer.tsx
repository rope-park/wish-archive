/**
 * Footer 컴포넌트
 * 
 * 사이트 하단 푸터
 * - 저작권, 링크 등
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t-4 border-black bg-linear-to-b from-wish-green/20 to-wish-sky/20 backdrop-blur-sm mt-20">
      {/* 상단 장식 별들 */}
      <div className="absolute -top-6 left-1/4 text-4xl animate-sparkle">✨</div>
      <div className="absolute -top-8 right-1/3 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
      
      <div className="wish-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* 왼쪽: 프로젝트 정보 */}
          <div className="space-y-3">
            <h3 className="font-bagel-fat-one text-2xl text-wish-pink">NCT WISH Archive</h3>
            <p className="text-sm font-jua text-gray-700">
              NCT WISH의 모든 활동을 기록하는 아카이브 💚
            </p>
          </div>

          {/* 중앙: 링크 */}
          <div className="space-y-3">
            <h4 className="font-bagel-fat-one text-lg text-text-dark">OFFICIAL LINKS</h4>
            <ul className="space-y-2 text-sm font-jua">
              <li>
                <a
                  href="https://www.instagram.com/nctwish_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-wish-pink transition-colors inline-flex items-center gap-2"
                >
                  <span>📸</span> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/NCTsmtown_WISH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-wish-sky transition-colors inline-flex items-center gap-2"
                >
                  <span>🐦</span> X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@NCTWISH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-500 transition-colors inline-flex items-center gap-2"
                >
                  <span>🎥</span> YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* 오른쪽: 추가 정보 */}
          <div className="space-y-3">
            <h4 className="font-bagel-fat-one text-lg text-text-dark">ABOUT</h4>
            <p className="text-xs font-jua text-gray-600 leading-relaxed">
              이 사이트는 팬이 만든 비공식 아카이브입니다. ✨
              <br />
              모든 콘텐츠의 저작권은 해당 권리자에게 있습니다.
            </p>
          </div>
        </div>

        {/* 하단: 저작권 */}
        <div className="mt-10 border-t-2 border-black/10 pt-6 text-center">
          <p className="font-press-start-2p text-[10px] text-gray-600">
            © {currentYear} NCT WISH ARCHIVE
          </p>
          <p className="mt-3 font-jua text-sm text-gray-700 flex items-center justify-center gap-2">
            Made with <span className="text-wish-pink text-xl animate-pulse">💚</span> by NCTzen WISH
          </p>
        </div>
      </div>
    </footer>
  );
}
