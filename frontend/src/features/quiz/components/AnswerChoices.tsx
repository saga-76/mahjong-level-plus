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
      className="grid w-full gap-3 sm:grid-cols-3 sm:gap-5 md:mx-auto md:w-3/4 xl:w-2/3 [@media(min-width:640px)_and_(max-height:900px)]:gap-3"
    >
      {choices.map((choice, index) => {
        const isSelected = choice === selectedAnswer

        return (
          <button
            key={`${choice}-${index}`}
            type="button"
            aria-pressed={isSelected}
            className={`min-h-28 cursor-pointer rounded px-4 py-3 text-2xl font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-40 sm:px-6 sm:py-4 sm:text-3xl [@media(min-width:640px)_and_(max-height:900px)]:min-h-24 [@media(min-width:640px)_and_(max-height:900px)]:py-2 [@media(min-width:640px)_and_(max-height:900px)]:text-2xl ${
              isSelected
                ? 'bg-[#1b4b36] text-white'
                : 'bg-emerald-700 text-white hover:bg-emerald-600'
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
