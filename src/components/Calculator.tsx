import { useState } from 'react'
import Button from './Button'
import styles from './Calculator.module.css'
import Switch from './Switch'

const Calculator = () => {
  const [data, setData] = useState({ operation: '', result: '' })

  const write = (event: React.MouseEvent<HTMLButtonElement>) => {
    const operators = ['+', '-', '*', '/', '%', '.']
    const newChar = event.currentTarget.textContent || ''
    const lastChar = data.operation.slice(-1)
    const lastOperation = data.operation.split(/[*%\-+/]/).pop() || ''

    if (data.operation.length >= 16) return
    if (newChar === '%' && data.operation.includes('%')) return
    if (newChar === '.' && lastOperation.includes('.')) return

    if (
      data.result !== '' &&
      data.operation === '' &&
      operators.includes(newChar)
    ) {
      setData({ ...data, operation: `${data.result}${newChar}` })
      return
    }

    if (operators.includes(lastChar) && operators.includes(newChar)) {
      setData({
        ...data,
        operation: data.operation.slice(0, -1) + newChar,
      })
      return
    }

    setData({
      ...data,
      operation: `${data.operation}` + `${newChar}`,
    })
  }

  const erase = () => {
    setData({
      ...data,
      operation: data.operation.slice(0, data.operation.length - 1),
    })
  }

  const eraseAll = () => {
    setData({ operation: '', result: '' })
  }

  const calculate = () => {
    if (data.operation === '') return
    let result = ''
    try {
      if (data.operation.includes('%')) {
        const [a, b] = data.operation.split('%')
        result = eval(`${b}*(${a}/100)`)
      } else {
        result = eval(data.operation)
      }

      setData({ ...data, result, operation: '' })
    } catch (error) {
      setData({ ...data, result: 'Error' })
    }
  }

  return (
    <main className={styles.main}>
      <Switch themeApp='dark' />
      <input
        className={styles.result}
        type='text'
        defaultValue={data.result}
        readOnly
      />
      <input
        className={styles.operation}
        type='text'
        defaultValue={data.operation}
        readOnly
      />
      <Button text='C' className='operator' handleClick={eraseAll} />
      <Button text='<' className='operator' handleClick={erase} />
      <Button text='%' className='operator' handleClick={write} />
      <Button text='/' className='operator' handleClick={write} />

      <Button text='7' className='number' handleClick={write} />
      <Button text='8' className='number' handleClick={write} />
      <Button text='9' className='number' handleClick={write} />
      <Button text='*' className='operator' handleClick={write} />

      <Button text='4' className='number' handleClick={write} />
      <Button text='5' className='number' handleClick={write} />
      <Button text='6' className='number' handleClick={write} />
      <Button text='-' className='operator' handleClick={write} />

      <Button text='1' className='number' handleClick={write} />
      <Button text='2' className='number' handleClick={write} />
      <Button text='3' className='number' handleClick={write} />
      <Button text='+' className='operator' handleClick={write} />

      <Button text='...' className='operator' />
      <Button text='0' className='number' handleClick={write} />
      <Button text='.' className='number' handleClick={write} />
      <Button text='=' className='equal' handleClick={calculate} />
    </main>
  )
}

export default Calculator
