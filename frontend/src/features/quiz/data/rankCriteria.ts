import type { RankCriterion } from '../types/rank'

export const rankCriteria = [
  {
    rank: 'G',
    minScore: 0,
    maxScore: 999,
    scoreLabel: '0〜999',
    description:
      'ここがスタート地点です。伸びしろだけなら、すでにSSSランクです。',
  },
  {
    rank: 'F',
    minScore: 1_000,
    maxScore: 1_999,
    scoreLabel: '1,000〜1,999',
    description:
      '正解より先に選択肢と目が合う時期です。解説を読めば着実に伸びます。',
  },
  {
    rank: 'E',
    minScore: 2_000,
    maxScore: 2_999,
    scoreLabel: '2,000〜2,999',
    description:
      '役と翻は見えてきました。符計算とは、これから仲良くなりましょう。',
  },
  {
    rank: 'D',
    minScore: 3_000,
    maxScore: 3_999,
    scoreLabel: '3,000〜3,999',
    description:
      '点数表があれば心強い段階です。まずはよく出る形から覚えましょう。',
  },
  {
    rank: 'C',
    minScore: 4_000,
    maxScore: 4_999,
    scoreLabel: '4,000〜4,999',
    description: '家族麻雀なら、あなたが点数係を引き受けてあげてください。',
  },
  {
    rank: 'B',
    minScore: 5_000,
    maxScore: 5_999,
    scoreLabel: '5,000〜5,999',
    description:
      '基本的な点数計算は身についています。符が増えたときだけ、少し慎重に。',
  },
  {
    rank: 'A',
    minScore: 6_000,
    maxScore: 6_999,
    scoreLabel: '6,000〜6,999',
    description:
      'よく出るアガリ形なら安定しています。珍しい形でも慌てず計算してみましょう。',
  },
  {
    rank: 'S',
    minScore: 7_000,
    maxScore: 8_499,
    scoreLabel: '7,000〜8,499',
    description:
      '仲間内では頼れる点数係です。たまにはほかの人にも計算させてあげましょう。',
  },
  {
    rank: 'SS',
    minScore: 8_500,
    maxScore: 9_999,
    scoreLabel: '8,500〜9,999',
    description:
      'かなりの計算力です。点数表を開くより、あなたに聞く方が早そうです。',
  },
  {
    rank: 'SSS',
    minScore: 10_000,
    maxScore: null,
    scoreLabel: '10,000〜（10問全問正解）',
    description: '10問全問正解です。点数申告で卓を止める心配はほぼありません。',
  },
] as const satisfies readonly RankCriterion[]
