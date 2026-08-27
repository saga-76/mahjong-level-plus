import type { Yaku } from '../../quiz'

const yakuReadings: Readonly<Record<string, string>> = {
  断么九: 'タンヤオ',
  平和: 'ピンフ',
  一盃口: 'イーペーコー',
  混一色: 'ホンイツ',
  七対子: 'チートイツ',
  清一色: 'チンイツ',
  門前清自摸和: 'メンゼンツモ',
  対々和: 'トイトイ',
  '役牌 中': 'ヤクハイ チュン',
}

function getYakuDisplayName(name: string): string {
  const reading = yakuReadings[name]

  return reading === undefined ? name : `${name}（${reading}）`
}

export function formatYakuLabel(yaku: readonly Yaku[]): string {
  return yaku
    .map((item) => `${getYakuDisplayName(item.name)}${item.han}翻`)
    .join('、')
}
