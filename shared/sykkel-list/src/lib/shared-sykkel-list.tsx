import styles from './shared-sykkel-list.module.css';

/* eslint-disable-next-line */
export interface SharedSykkelListProps {}

export function SharedSykkelList(props: SharedSykkelListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedSykkelList!</h1>
    </div>
  );
}

export default SharedSykkelList;
