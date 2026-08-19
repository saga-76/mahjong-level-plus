import topBackground from '../assets/top-background.webp'
import { HowToDialog } from './HowToDialog'
import { MahjongTileDecoration } from './MahjongTileDecoration'
import { TopActions } from './TopActions'
import { TopFooter } from './TopFooter'

type TopPageProps = {
  isHowToOpen: boolean
  onOpenHowTo: () => void
  onCloseHowTo: () => void
}

export function TopPage({
  isHowToOpen,
  onOpenHowTo,
  onCloseHowTo,
}: TopPageProps) {
  return (
    <div
      className="relative min-h-svh overflow-hidden bg-cover bg-center font-['Yu_Mincho','Hiragino_Mincho_ProN',serif]"
      style={{ backgroundImage: `url(${topBackground})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />

      <div className="relative z-20 flex min-h-svh flex-col">
        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
          <section className="flex w-full max-w-4xl -translate-y-6 flex-col items-center text-center">
            <h1 className="bg-gradient-to-b from-[#fff1c7] via-[#d8ad68] to-[#9a682e] bg-clip-text text-5xl leading-tight font-bold tracking-[0.08em] text-transparent drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)] sm:text-7xl md:text-8xl lg:text-9xl">
              麻雀レベル++
            </h1>

            <p className="mt-4 text-base font-semibold tracking-[0.28em] text-[#e8c58d] drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] sm:text-xl md:text-2xl">
              点数計算を、速く、正確に
            </p>

            <div
              aria-hidden="true"
              className="my-6 flex w-full max-w-xl items-center gap-4 text-[#c99b55]"
            >
              <span className="h-px flex-1 bg-current/60" />
              <span className="size-3 rotate-45 border border-current" />
              <span className="h-px flex-1 bg-current/60" />
            </div>

            <div className="w-full max-w-2xl">
              <TopActions onOpenHowTo={onOpenHowTo} />
            </div>
          </section>
        </main>

        <TopFooter />
      </div>

      <MahjongTileDecoration />

      <HowToDialog isOpen={isHowToOpen} onClose={onCloseHowTo} />
    </div>
  )
}
