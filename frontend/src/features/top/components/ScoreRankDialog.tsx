import { useEffect, useRef } from 'react'
import { rankCriteria } from '../../quiz'

type ScoreRankDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function ScoreRankDialog({ isOpen, onClose }: ScoreRankDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (isOpen && !dialog.open) {
      dialog.showModal()
    }

    if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="score-rank-dialog-title"
      className="modal backdrop:bg-black/70"
      onCancel={onClose}
      onClose={onClose}
    >
      <section className="modal-box max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto border-2 border-[#c6a160] bg-[#0b3022] p-4 text-[#f1d49e] shadow-2xl sm:p-6">
        <h2
          id="score-rank-dialog-title"
          className="text-center text-2xl font-bold tracking-[0.1em] sm:text-3xl sm:tracking-[0.15em]"
        >
          得点・ランク
        </h2>

        <p className="mt-3 text-center text-sm text-[#f5e7c8] sm:mt-4 sm:text-base">
          正解1問につき1,000点、回答時間に応じて最大500点が加算されます。
        </p>

        <div className="mt-5 overflow-x-auto sm:mt-6">
          <div
            role="table"
            aria-label="得点とランク基準"
            className="sm:min-w-[44rem]"
          >
            <div
              role="row"
              className="hidden grid-cols-[5rem_12rem_minmax(20rem,1fr)] border-b border-[#c6a160] px-3 py-2 text-left text-sm text-[#e8c58d] sm:grid"
            >
              <span role="columnheader">ランク</span>
              <span role="columnheader">スコア</span>
              <span role="columnheader">習熟度の目安</span>
            </div>

            <ul role="rowgroup" className="space-y-3 sm:space-y-0">
              {rankCriteria.map(({ rank, scoreLabel, description }) => (
                <li
                  key={rank}
                  role="row"
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-2 rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:grid-cols-[5rem_12rem_minmax(20rem,1fr)] sm:gap-0 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:border-b-[#c6a160]/40 sm:bg-transparent"
                >
                  <span
                    role="cell"
                    className="text-2xl font-semibold text-[#f1d49e] sm:text-xl"
                  >
                    {rank}
                  </span>
                  <span
                    role="cell"
                    className="justify-self-end whitespace-nowrap text-sm text-[#e8c58d] sm:justify-self-start sm:text-base sm:text-[#f5e7c8]"
                  >
                    {scoreLabel}
                  </span>
                  <span
                    role="cell"
                    className="col-span-2 text-sm leading-relaxed text-[#f5e7c8] sm:col-span-1 sm:text-base"
                  >
                    {description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-[#d6bb88] sm:text-sm">
          SSSランクは、10問全問正解かつ10,000点以上の場合に獲得できます。
          <br />
          ランクと説明は、本サービスのスコアをもとにした習熟度の目安です。
        </p>

        <div className="modal-action justify-center">
          <button
            type="button"
            className="w-full cursor-pointer border-2 border-[#a9854e] bg-[#efe4cb] px-6 py-3 text-base font-semibold tracking-[0.2em] text-[#063b2b] transition hover:bg-[#fff3d9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2d18f] sm:w-auto sm:min-w-40 sm:px-8 sm:text-lg"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </section>
    </dialog>
  )
}
