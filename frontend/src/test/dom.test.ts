import { describe, expect, it } from 'vitest'

describe('DOMテスト環境', () => {
  it('DOM要素を作成して検証できる', () => {
    const element = document.createElement('div')
    element.textContent = '麻雀レベル++'
    document.body.append(element)

    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('麻雀レベル++')
  })
})
