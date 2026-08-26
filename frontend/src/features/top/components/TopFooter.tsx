import { Link } from 'react-router-dom'

export function TopFooter() {
  return (
    <footer className="relative z-30 px-4 py-5 sm:py-6 [@media(max-height:850px)]:py-2">
      <nav aria-label="フッターメニュー">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#e7d3aa] sm:text-base">
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
