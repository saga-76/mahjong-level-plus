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
      className="grid w-full gap-3 sm:grid-cols-3"
    >
      {choices.map((choice, index) => {
        const isSelected = choice === selectedAnswer

        return (
          <button
            key={`${choice}-${index}`}
            type="button"
            aria-pressed={isSelected}
            className={`min-h-16 cursor-pointer rounded border-2 px-4 py-3 text-lg font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] ${
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
