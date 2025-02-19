import { Chip } from '@legion-ui/core';
import styles from './styles.module.css';
import { useState } from 'react';

interface Props {
  className?: string;
  list?: string[];
}

function ChipsSlider(props: Props) {
  const { className, list } = props;
  const [isActiveIndex, setIsActiveIndex] = useState(0);  
  return (
    <div className={[styles.root, className].filter(Boolean).join('')}>
      <div>
        {
          list?.map((item, index) => (
            <Chip
              className={`${styles.primary} ${isActiveIndex === index ? styles['primary-active'] : ''}`}
              variant="solid"
              key={index}
              onClick={() => index !== isActiveIndex &&setIsActiveIndex(index)}
            >
              {item}
            </Chip>
          ))
        }
      </div>
    </div>
  )
}

export default ChipsSlider
