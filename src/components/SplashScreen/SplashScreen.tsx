import { useNavigate } from 'react-router';
import './styles.scoped.css';

function SplashScreen() {
  const navigate = useNavigate();
  const onClick = () => {
    return navigate('/login');
  }
  return (
    <div className="root" onClick={onClick}>
      <h1>Welcom to KITB</h1>
    </div>
  )
}

export default SplashScreen
