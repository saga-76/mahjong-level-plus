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
      className="pointer-events-none absolute right-[clamp(6rem,12vw,16rem)] bottom-[clamp(9rem,17vh,15rem)] z-10 hidden origin-bottom-right -rotate-10 items-end opacity-75 xl:flex"
    >
      {tileNames.map((tileName, index) => (
        <div
          key={tileName}
          className="relative -ml-3 aspect-[3/4] w-[clamp(4.5rem,5vw,7rem)] overflow-hidden rounded-[10%] border border-[#b38a4f] bg-[#f2e5c8] p-0.5 shadow-[0_4px_8px_rgba(0,0,0,0.55)] first:ml-0"
          style={{ transform: `translateY(${index * -3}px)` }}
        >
          <img
            alt=""
            className="size-full object-contain"
            draggable="false"
            src={`/assets/mahjong/${tileName}.svg`}
          />
        </div>
      ))}
    </div>
  )
}
