const tileNames = [
  'Pin7',
  'Pin5',
  'Pin8',
  'Sou6',
  'Man1',
  'Ton',
  'Hatsu',
] as const

export function MahjongTileDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-36 bottom-96 z-10 hidden origin-bottom-right -rotate-10 items-end brightness-50 md:flex"
    >
      {tileNames.map((tileName, index) => (
        <div
          key={tileName}
          className="relative -ml-3 aspect-[3/4] w-[clamp(6rem,7vw,9rem)] overflow-hidden rounded-[12%] border-2 border-[#a9854e] bg-[#efe4cb] shadow-[inset_0_0_0_3px_rgba(127,91,43,0.18)] drop-shadow-[0_8px_6px_rgba(0,0,0,0.6)] first:ml-0"
          style={{ transform: `translateY(${index * -3}px)` }}
        >
          <img
            alt=""
            className="size-full"
            draggable="false"
            src={`/assets/mahjong/${tileName}.svg`}
          />
        </div>
      ))}
    </div>
  )
}
