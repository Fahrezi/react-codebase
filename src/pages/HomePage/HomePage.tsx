import UserForm from 'src/components/forms/User';
import BarChart from '../ShowCase/component/dashboard/BarChart';
import styles from './styles.module.css';
import InfiniteMenu from './component/InfiniteMenu';

function HomePage() {
  return (
    <div className={styles.root}>
      <InfiniteMenu className={styles['infinite-menu']} size={392} />
    </div>
  )
}

export default HomePage
