type ReviewActionsProps = {
  readonly onBack: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
}

export function ReviewActions({ onBack, onRetry, onTop }: ReviewActionsProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
      <button
        type="button"
        className="w-full cursor-pointer rounded border-2 border-[#c6a160] bg-[#f2e5c8] px-4 py-3 font-semibold text-[#063b2b] transition hover:bg-[#f8efd9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:w-auto sm:px-6"
        onClick={onBack}
      >
        結果に戻る
      </button>
      <button
        type="button"
        className="w-full cursor-pointer rounded border-2 border-[#c6a160] bg-[#123727] px-4 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:w-auto sm:px-6"
        onClick={onRetry}
      >
        もう一度挑戦
      </button>
      <button
        type="button"
        className="w-full cursor-pointer rounded border-2 border-[#c6a160] bg-transparent px-4 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:w-auto sm:px-6"
        onClick={onTop}
      >
        トップ画面
      </button>
    </div>
  )
}
