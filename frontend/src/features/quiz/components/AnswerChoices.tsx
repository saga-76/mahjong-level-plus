type AnswerChoicesProps = {
  readonly choices: readonly [string, string, string]
  readonly selectedAnswer: string | null
  readonly onSelect: (answer: string) => void
}

export function AnswerChoices({
  choices,
  selectedAnswer,
  onSelect,
}: AnswerChoicesProps) {
  return (
    <div
      role="group"
      aria-label="点数の選択肢"
      className="grid w-full gap-2 sm:grid-cols-3 sm:gap-3 md:mx-auto md:w-2/3 xl:w-1/2"
    >
      {choices.map((choice, index) => {
        const isSelected = choice === selectedAnswer

        return (
          <button
            key={`${choice}-${index}`}
            type="button"
            aria-pressed={isSelected}
            className={`min-h-12 cursor-pointer rounded border-2 px-3 py-2 text-base font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:min-h-16 sm:px-4 sm:py-3 sm:text-lg [@media(min-width:640px)_and_(max-height:900px)]:min-h-12 [@media(min-width:640px)_and_(max-height:900px)]:py-2 ${
              isSelected
                ? 'border-[#f1d49e] bg-[#1b4b36] text-[#f1d49e] ring-2 ring-[#d4ae6b]'
                : 'border-[#c6a160] bg-[#f2e5c8] text-[#063b2b] hover:bg-[#f8efd9]'
            }`}
            onClick={() => onSelect(choice)}
          >
            <span className="whitespace-normal break-words">{choice}</span>
          </button>
        )
      })}
    </div>
  )
}
