import { useEffect, useState } from 'react'
import styles from './Switch.module.css'

type Theme = 'light' | 'dark'

type Props = {
  themeApp: Theme
}

const Switch = ({ themeApp }: Props) => {
  const [theme, setTheme] = useState(themeApp)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light')
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <section className={styles.switch}>
      <label className={styles.toogle}>
        <input
          type='checkbox'
          className={styles['check-switch']}
          onChange={handleChange}
          checked={theme === 'dark'}
          hidden
        />
        <span className={styles.slider}></span>
      </label>
    </section>
  )
}

export default Switch
