import styles from './styles.module.css';
import InfiniteMenu from './component/InfiniteMenu';
import ChipsSlider from 'src/components/Elements/ChipsSlider';

function HomePage() {
  const listChips = [
    'Laporan Harian',
    'Laporan Mingguan',
    'Laporan Bulanan',
    'Laporan Tahunan',
  ]
  return (
    <div className={styles.root}>
      <ChipsSlider list={listChips} />
      <InfiniteMenu className={styles['infinite-menu']} size={392} />
    </div>
  )
}

export default HomePage
