import UserForm from 'src/components/forms/User';
import BarChart from '../dashboard/BarChart';
import styles from './styles.module.css';
import InfiniteMenu from './component/InfiniteMenu';

function HomePage() {
  return (
    <div className={styles.root}>
      <section className={styles.container}>
        <h2>Charts</h2>
        <BarChart />
      </section>
      <section className={styles.container}>
        <h2>Form User</h2>
        <UserForm />
      </section>
      <InfiniteMenu className={styles['infinite-menu']} size={500} />
    </div>
  )
}

export default HomePage
