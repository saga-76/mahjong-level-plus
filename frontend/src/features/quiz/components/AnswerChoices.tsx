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
      className="grid w-full min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-1.5 sm:gap-5 md:mx-auto md:w-3/4 xl:w-2/3 [@media(min-width:640px)_and_(max-height:900px)]:gap-3"
    >
      {choices.map((choice, index) => {
        const isSelected = choice === selectedAnswer
        const [firstPayment, secondPayment] = choice.split(' / ')
        const allPayment = choice.match(/^(.+点) オール$/)

        return (
          <button
            key={`${choice}-${index}`}
            type="button"
            aria-label={choice}
            aria-pressed={isSelected}
            className={`min-h-14 min-w-0 cursor-pointer rounded px-1 py-2 text-[clamp(0.75rem,4vw,1rem)] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-40 sm:px-6 sm:py-4 sm:text-3xl [@media(min-width:640px)_and_(max-height:900px)]:min-h-24 [@media(min-width:640px)_and_(max-height:900px)]:py-2 [@media(min-width:640px)_and_(max-height:900px)]:text-2xl ${
              isSelected
                ? 'bg-[#1b4b36] text-white'
                : 'bg-emerald-700 text-white hover:bg-emerald-600'
            }`}
            onClick={() => onSelect(choice)}
          >
            {secondPayment !== undefined ? (
              <span className="inline-flex flex-wrap justify-center">
                <span className="whitespace-nowrap">{firstPayment}/</span>
                <span className="whitespace-nowrap">{secondPayment}</span>
              </span>
            ) : allPayment === null ? (
              <span>{choice}</span>
            ) : (
              <span className="inline-flex flex-wrap justify-center gap-x-1">
                <span className="whitespace-nowrap">{allPayment[1]}</span>
                <span className="whitespace-nowrap">オール</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
