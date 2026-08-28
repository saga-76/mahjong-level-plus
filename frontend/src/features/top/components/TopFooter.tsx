import { Link } from 'react-router-dom'

export function TopFooter() {
  return (
    <footer className="relative z-30 mt-auto w-full shrink-0 border-t border-[#c6a160]/25 bg-[#021710]/55 px-3 py-3 backdrop-blur-[2px] sm:px-4 sm:py-5 lg:py-6 [@media(min-width:640px)_and_(max-height:850px)]:py-2">
      <nav aria-label="フッターメニュー">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white sm:text-base">
          <li>
            <Link
              className="underline-offset-4 transition hover:text-[#f6dda9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2d18f]"
              to="/terms"
            >
              利用規約
            </Link>
          </li>

          <li>
            <Link
              className="underline-offset-4 transition hover:text-[#f6dda9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2d18f]"
              to="/privacy"
            >
              プライバシーポリシー
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
