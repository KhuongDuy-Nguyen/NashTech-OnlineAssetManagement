import styles from './Loading.module.css';

const Loading = (props) => {
  return (
    <div class={styles["loader__wrap"]} role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
      <div class={styles["loader"]} aria-hidden="true">
        <div class={styles["loader__sq"]}></div>
        <div class={styles["loader__sq"]}></div>
      </div>
    </div>  
  )
}

export default Loading;