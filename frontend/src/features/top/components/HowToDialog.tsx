import { useEffect, useRef } from 'react'
import { QUIZ_QUESTION_COUNT } from '../../quiz'

type HowToDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function HowToDialog({ isOpen, onClose }: HowToDialogProps) {
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
      aria-labelledby="how-to-dialog-title"
      className="modal backdrop:bg-black/70"
      onCancel={onClose}
      onClose={onClose}
    >
      <section className="modal-box max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-2xl overscroll-y-contain overflow-y-auto border-2 border-[#c6a160] bg-[#0b3022] p-4 text-white shadow-2xl [scrollbar-gutter:stable] sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:p-6">
        <h2
          id="how-to-dialog-title"
          className="text-center text-2xl font-bold tracking-[0.14em] sm:text-3xl sm:tracking-[0.2em]"
        >
          遊び方
        </h2>

        <ol className="mt-5 list-decimal space-y-3 pl-5 text-left text-sm leading-relaxed text-white sm:mt-8 sm:space-y-4 sm:pl-6 sm:text-lg">
          <li>「スタート」ボタンを押して挑戦を開始します。</li>
          <li>表示された麻雀のアガリ形と条件を確認します。</li>
          <li>3つの選択肢から正しい点数を選びます。</li>
          <li>選択肢を押すと回答が確定し、次の問題へ進みます。</li>
          <li>同じ流れで全{QUIZ_QUESTION_COUNT}問に回答します。</li>
          <li>
            {QUIZ_QUESTION_COUNT}
            問終了後に、正解数・回答時間・ランクを確認します。
          </li>
        </ol>

        <p className="mt-5 text-center text-xs text-white sm:mt-6 sm:text-sm">
          正確さと回答の速さを意識して、高いスコアを目指しましょう。
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
