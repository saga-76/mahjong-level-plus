import { describe, expect, it } from 'vitest'

import { formatYakuLabel } from './formatYakuLabel'

describe('formatYakuLabel', () => {
  it('正式名称・読み・翻数を組み合わせる', () => {
    expect(
      formatYakuLabel([
        { name: '七対子', han: 2 },
        { name: 'リーチ', han: 1 },
      ]),
    ).toBe('七対子（チートイツ）2翻、リーチ1翻')
  })

  it('読みが未登録の役名は正式名称をそのまま使う', () => {
    expect(formatYakuLabel([{ name: 'テスト役', han: 1 }])).toBe('テスト役1翻')
  })
})
