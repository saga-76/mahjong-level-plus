import { useEffect, useRef } from 'react'

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
      <section className="modal-box max-w-2xl border-2 border-[#c6a160] bg-[#0b3022] text-[#f1d49e] shadow-2xl">
        <h2
          id="how-to-dialog-title"
          className="text-center text-3xl font-bold tracking-[0.2em]"
        >
          遊び方
        </h2>

        <ol className="mt-8 list-decimal space-y-4 pl-6 text-left text-base leading-relaxed text-[#f5e7c8] sm:text-lg">
          <li>「スタート」ボタンを押して挑戦を開始します。</li>
          <li>表示された麻雀のアガリ形と条件を確認します。</li>
          <li>3つの選択肢から正しい点数を選びます。</li>
          <li>選択肢を押すと回答が確定し、次の問題へ進みます。</li>
          <li>同じ流れで全10問に回答します。</li>
          <li>10問終了後に、正解数・回答時間・ランクを確認します。</li>
        </ol>

        <p className="mt-6 text-center text-sm text-[#d6bb88]">
          正確さと回答の速さを意識して、高いスコアを目指しましょう。
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
