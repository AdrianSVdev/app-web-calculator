import styles from './Button.module.css'

type Props = {
  text: string
  className: string
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ text, className, handleClick }: Props) => {
  return (
    <button
      className={`${styles.button} ${styles[className]}`}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default Button
