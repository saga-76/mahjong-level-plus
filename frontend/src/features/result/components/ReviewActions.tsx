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
        className="w-full cursor-pointer rounded bg-[#f3e8ce] px-4 py-3 font-semibold text-[#031a14] transition hover:bg-[#fff5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-6"
        onClick={onRetry}
      >
        もう一度挑戦
      </button>
      <button
        type="button"
        className="w-full cursor-pointer rounded bg-[#f3e8ce] px-4 py-3 font-semibold text-[#031a14] transition hover:bg-[#fff5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-6"
        onClick={onBack}
      >
        結果に戻る
      </button>
      <button
        type="button"
        className="w-full cursor-pointer rounded bg-[#f3e8ce] px-4 py-3 font-semibold text-[#031a14] transition hover:bg-[#fff5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-6"
        onClick={onTop}
      >
        トップ画面
      </button>
    </div>
  )
}
