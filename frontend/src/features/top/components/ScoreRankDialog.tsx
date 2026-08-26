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

        <ul className="mt-5 space-y-3 sm:hidden">
          {rankCriteria.map(({ rank, scoreLabel, description }) => (
            <li
              key={rank}
              className="rounded border border-[#c6a160]/50 bg-black/20 p-3"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-2xl font-semibold text-[#f1d49e]">
                  {rank}
                </span>
                <span className="text-sm text-[#e8c58d]">{scoreLabel}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#f5e7c8]">
                {description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 hidden overflow-x-auto sm:block">
          <table className="table">
            <thead>
              <tr className="border-[#c6a160] text-[#e8c58d]">
                <th>ランク</th>
                <th>スコア</th>
                <th>習熟度の目安</th>
              </tr>
            </thead>

            <tbody>
              {rankCriteria.map(({ rank, scoreLabel, description }) => (
                <tr key={rank} className="border-[#c6a160]/40">
                  <th className="text-xl text-[#f1d49e]">{rank}</th>
                  <td className="whitespace-nowrap text-[#f5e7c8]">
                    {scoreLabel}
                  </td>
                  <td className="min-w-80 text-[#f5e7c8]">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
