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
      <section className="modal-box max-h-[85svh] max-w-4xl overflow-y-auto border-2 border-[#c6a160] bg-[#0b3022] text-[#f1d49e] shadow-2xl">
        <h2
          id="score-rank-dialog-title"
          className="text-center text-3xl font-bold tracking-[0.15em]"
        >
          得点・ランク
        </h2>

        <p className="mt-4 text-center text-[#f5e7c8]">
          最終得点は、正解数と回答時間によって決まります。
        </p>

        <div className="mt-6 overflow-x-auto">
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

        <p className="mt-4 text-center text-sm text-[#d6bb88]">
          ランクと説明は、本サービスのスコアをもとにした習熟度の目安です。
        </p>

        <div className="modal-action justify-center">
          <button
            type="button"
            className="min-w-40 cursor-pointer border-2 border-[#a9854e] bg-[#efe4cb] px-8 py-3 text-lg font-semibold tracking-[0.2em] text-[#063b2b] transition hover:bg-[#fff3d9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2d18f]"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </section>
    </dialog>
  )
}
