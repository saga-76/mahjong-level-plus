import { describe, expect, it } from 'vitest'

import type { AnswerRecord } from '../types/answer'
import { questions } from '../data/question'
import { calculateScore } from './calculateScore'

function createAnswers(correctAnswerCount: number): AnswerRecord[] {
  return questions.map((question, index) => ({
    questionId: question.id,
    selectedAnswer:
      index < correctAnswerCount
        ? question.correctAnswer
        : question.choices.find((choice) => choice !== question.correctAnswer)!,
  }))
}

describe('calculateScore', () => {
  it('1問正解につき1,000点を加算して正解数を集計する', () => {
    const result = calculateScore({
      questions,
      answers: createAnswers(5),
      elapsedTimeMs: 60_000,
    })

    expect(result.correctCount).toBe(5)
    expect(result.correctScore).toBe(5_000)
  })

  it('正答率と回答時間からタイムボーナスを計算する', () => {
    const result = calculateScore({
      questions,
      answers: createAnswers(10),
      elapsedTimeMs: 120_000,
    })

    expect(result.timeBonus).toBe(250)
  })

  it('正解点とタイムボーナスを合計する', () => {
    const result = calculateScore({
      questions,
      answers: createAnswers(10),
      elapsedTimeMs: 60_000,
    })

    expect(result).toEqual({
      correctCount: 10,
      correctScore: 10_000,
      timeBonus: 500,
      totalScore: 10_500,
    })
  })

  it('回答が速い場合もタイムボーナスを500点までに制限する', () => {
    const result = calculateScore({
      questions,
      answers: createAnswers(10),
      elapsedTimeMs: 1,
    })

    expect(result.timeBonus).toBe(500)
    expect(result.totalScore).toBe(10_500)
  })

  it('正解数が0または回答時間が0の場合はタイムボーナスを0にする', () => {
    const noCorrectAnswers = calculateScore({
      questions,
      answers: createAnswers(0),
      elapsedTimeMs: 30_000,
    })
    const zeroElapsedTime = calculateScore({
      questions,
      answers: createAnswers(10),
      elapsedTimeMs: 0,
    })

    expect(noCorrectAnswers.timeBonus).toBe(0)
    expect(noCorrectAnswers.totalScore).toBe(0)
    expect(zeroElapsedTime.timeBonus).toBe(0)
    expect(zeroElapsedTime.totalScore).toBe(10_000)
  })

  it('同じ問題の回答が重複しても正解数を重複集計しない', () => {
    const duplicateAnswers = [
      {
        questionId: questions[0].id,
        selectedAnswer: questions[0].correctAnswer,
      },
      {
        questionId: questions[0].id,
        selectedAnswer: questions[0].correctAnswer,
      },
    ]

    const result = calculateScore({
      questions,
      answers: duplicateAnswers,
      elapsedTimeMs: 30_000,
    })

    expect(result.correctCount).toBe(1)
    expect(result.correctScore).toBe(1_000)
  })
})
