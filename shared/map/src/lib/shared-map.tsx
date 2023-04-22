import styles from './shared-map.module.css';

/* eslint-disable-next-line */
export interface SharedMapProps {}

export function SharedMap(props: SharedMapProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedMap!</h1>
    </div>
  );
}

export default SharedMap;
