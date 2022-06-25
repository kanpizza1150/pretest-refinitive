import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import * as Styled from './styled'
enum CalculationMode {
  PRIME = 'prime',
  FIBONACCI = 'fibonacci',
}
const Q1: FC = () => {
  const [numberInput, setNumberInput] = useState<string>('')
  const [calculationMode, setCalculationMode] = useState<CalculationMode>(CalculationMode.PRIME)
  const handleInputOnBlur = () => {
    const parsed = parseFloat(numberInput)
    if (parsed) {
      const result = parsed < 0 ? 1 : Math.round(parsed)
      setNumberInput(`${result}`)
    } else {
      setNumberInput('')
    }
  }
  const handleOnModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCalculationMode(e.target.value as CalculationMode)
  }

  const isPrime = (): boolean => {
    const parsed = parseFloat(numberInput)
    for (let i = 2; i * i <= parsed; i++) {
      if (parsed % i === 0) return false
    }
    return parsed > 1
  }
  const isPerfectSquare = (x: number): boolean => {
    const sqrt = parseInt(`${Math.sqrt(x)}`)
    return sqrt * sqrt == x
  }

  const isFibonacci = (): boolean => {
    const n = parseFloat(numberInput)
    return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4)
  }

  const result = useMemo(() => {
    return calculationMode === CalculationMode.PRIME ? `${isPrime()}` : `${isFibonacci()}`
  }, [numberInput, calculationMode])

  return (
    <Styled.Container>
      <div>
        <input
          value={numberInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNumberInput(e.target.value)}
          onBlur={handleInputOnBlur}
          type='number'
        />
      </div>
      <div>
        <select name='calculationMode' onChange={handleOnModeChange} value={calculationMode}>
          <option value={CalculationMode.PRIME}>isPrime</option>
          <option value={CalculationMode.FIBONACCI}>IsFibonacci</option>
        </select>
      </div>
      <div>{result}</div>
    </Styled.Container>
  )
}

export default Q1
