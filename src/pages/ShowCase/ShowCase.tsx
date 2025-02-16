import BarChart from './component/dashboard/BarChart';
import UserForm from 'src/components/forms/User';
import styles from './styles.module.css';

function ShowCase() {
  return (
    <div>
      <section className={styles.container}>
        <h2>Charts</h2>
        <BarChart />
      </section>
      <section className={styles.container}>
        <h2>Form User</h2>
        <UserForm />
      </section>
    </div>
  )
}

export default ShowCase;