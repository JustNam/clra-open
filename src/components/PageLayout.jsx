import styles from './PageLayout.module.scss'

export function PageLayout({ title, actions, children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
