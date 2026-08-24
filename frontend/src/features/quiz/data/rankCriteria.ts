import type { RankCriterion } from '../types/rank'

export const rankCriteria = [
  {
    rank: 'G',
    minScore: 0,
    maxScore: 200,
    scoreLabel: '0〜200',
    description:
      'ここがスタート地点です。伸びしろだけなら、すでにSSSランクです。',
  },
  {
    rank: 'F',
    minScore: 201,
    maxScore: 400,
    scoreLabel: '201〜400',
    description:
      '正解より先に選択肢と目が合う時期です。解説を読めば着実に伸びます。',
  },
  {
    rank: 'E',
    minScore: 401,
    maxScore: 600,
    scoreLabel: '401〜600',
    description:
      '役と翻は見えてきました。符計算とは、これから仲良くなりましょう。',
  },
  {
    rank: 'D',
    minScore: 601,
    maxScore: 800,
    scoreLabel: '601〜800',
    description:
      '点数表があれば心強い段階です。まずはよく出る形から覚えましょう。',
  },
  {
    rank: 'C',
    minScore: 801,
    maxScore: 1_000,
    scoreLabel: '801〜1000',
    description: '家族麻雀なら、あなたが点数係を引き受けてあげてください。',
  },
  {
    rank: 'B',
    minScore: 1_001,
    maxScore: 1_200,
    scoreLabel: '1001〜1200',
    description:
      '基本的な点数計算は身についています。符が増えたときだけ、少し慎重に。',
  },
  {
    rank: 'A',
    minScore: 1_201,
    maxScore: 1_400,
    scoreLabel: '1201〜1400',
    description:
      'よく出るアガリ形なら安定しています。珍しい形でも慌てず計算してみましょう。',
  },
  {
    rank: 'S',
    minScore: 1_401,
    maxScore: 1_600,
    scoreLabel: '1401〜1600',
    description:
      '仲間内では頼れる点数係です。たまにはほかの人にも計算させてあげましょう。',
  },
  {
    rank: 'SS',
    minScore: 1_601,
    maxScore: 1_800,
    scoreLabel: '1601〜1800',
    description:
      'かなりの計算力です。点数表を開くより、あなたに聞く方が早そうです。',
  },
  {
    rank: 'SSS',
    minScore: 1_801,
    maxScore: null,
    scoreLabel: '1801〜',
    description:
      '点数申告で卓を止める心配はほぼありません。雀荘でも自信を持ってどうぞ。',
  },
] as const satisfies readonly RankCriterion[]
