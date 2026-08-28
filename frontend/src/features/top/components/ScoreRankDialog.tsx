import { useEffect, useRef } from 'react'
import {
  POINTS_PER_CORRECT_ANSWER,
  QUIZ_QUESTION_COUNT,
  rankCriteria,
} from '../../quiz'

type ScoreRankDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function ScoreRankDialog({ isOpen, onClose }: ScoreRankDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const perfectCorrectScore = QUIZ_QUESTION_COUNT * POINTS_PER_CORRECT_ANSWER

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
      <section className="modal-box max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-4xl overscroll-y-contain overflow-y-auto border-2 border-[#c6a160] bg-[#0b3022] p-4 text-white shadow-2xl [scrollbar-gutter:stable] sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:p-6">
        <h2
          id="score-rank-dialog-title"
          className="text-center text-2xl font-bold tracking-[0.1em] sm:text-3xl sm:tracking-[0.15em]"
        >
          得点・ランク
        </h2>

        <p className="mt-3 text-center text-sm text-white sm:mt-4 sm:text-base">
          正解1問につき1,000点、回答時間に応じて最大500点が加算されます。
        </p>

        <div className="mt-5 sm:mt-6">
          <div role="table" aria-label="得点とランク基準">
            <div
              role="row"
              className="hidden grid-cols-[5rem_12rem_minmax(20rem,1fr)] border-b border-[#c6a160] px-3 py-2 text-left text-sm text-white lg:grid"
            >
              <span role="columnheader">ランク</span>
              <span role="columnheader">スコア</span>
              <span role="columnheader">習熟度の目安</span>
            </div>

            <ul role="rowgroup" className="space-y-3 lg:space-y-0">
              {rankCriteria.map(({ rank, scoreLabel, description }) => (
                <li
                  key={rank}
                  role="row"
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-2 rounded border border-[#c6a160]/60 bg-[#031f18]/80 p-3 lg:grid-cols-[5rem_12rem_minmax(20rem,1fr)] lg:gap-0 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-[#c6a160]/40 lg:bg-transparent"
                >
                  <span
                    role="cell"
                    className="text-2xl font-semibold text-white lg:text-xl"
                  >
                    {rank}
                  </span>
                  <span
                    role="cell"
                    className="justify-self-end whitespace-nowrap text-sm text-white sm:text-base lg:justify-self-start"
                  >
                    {scoreLabel}
                  </span>
                  <span
                    role="cell"
                    className="col-span-2 text-sm leading-relaxed text-white sm:text-base lg:col-span-1"
                  >
                    {description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-white sm:text-sm">
          SSSランクは、{QUIZ_QUESTION_COUNT}問全問正解かつ
          {perfectCorrectScore.toLocaleString()}点以上の場合に獲得できます。
          <br />
          ランクと説明は、本サービスのスコアをもとにした習熟度の目安です。
        </p>

        <div className="modal-action sticky -bottom-4 justify-center bg-gradient-to-t from-[#0b3022] via-[#0b3022] to-transparent pt-5 pb-1 sm:-bottom-6">
          <button
            type="button"
            className="w-full cursor-pointer bg-[#efe4cb] px-6 py-3 text-base font-semibold tracking-[0.2em] text-[#063b2b] transition hover:bg-[#fff3d9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:min-w-40 sm:px-8 sm:text-lg"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </section>
    </dialog>
  )
}
