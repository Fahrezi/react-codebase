import React, { useEffect, useRef, useState } from 'react'
import { COLORS, MENUS, MENUS_DETAIL } from './const';
import styles from './styles.module.css';

interface Props {
  className?: string;
  size?: number;
}
function InfiniteMenu(props: Props) {
  const { size=300 } = props;
  const slices = 8;
  const slicedAngle = 360 / slices;
  const radius = 50;
  const strokeWidth = 2;
  const padding = strokeWidth / 2;
  const centerX = 0;
  const centerY = 0;
  
  const [rotation, setRotation] = useState(0);
  const [currentIndexActiveMenu, setCurrentIndexActiveMenu] = useState(0); //to control active menu index
  
  const visibleCount = 8;
  const [currentIndex, setCurrentIndex] = useState(0); //to track index in total menu
  const [visibleMenu, setVisibleMenu] = useState<string[]>([]);

  const [showOption, setShowOption] = useState(false);

  const startAngleRef = useRef(0);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastAngleRef = useRef(0);

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    isDraggingRef.current = true;
    const { clientX, clientY } = event;
    startXRef.current= clientX;
    startAngleRef.current = getAngle(clientX, clientY);
    lastAngleRef.current = rotation;
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if(!isDraggingRef.current) return;

    event.preventDefault();
    const { clientX, clientY } = event;
    const currentAngle = getAngle(clientX, clientY);
    const angleDiff = currentAngle - startAngleRef.current;

    let newRotation = lastAngleRef.current + angleDiff;

    const normalizedRotation = ((newRotation % 360) + 360) % 360;
    const currentPieceIndex = Math.round(normalizedRotation / slicedAngle) % slices;
    const resultPieceIndex = currentPieceIndex === 0 ? currentPieceIndex : 8 - currentPieceIndex;

    if (currentIndexActiveMenu !== resultPieceIndex) {
      setShowOption(false);
      const direction = getDirection(currentIndexActiveMenu, resultPieceIndex); // 1 for forward, -1 for backward
      setCurrentIndex(prev => (prev + direction + MENUS.length) % MENUS.length);
    }

    setCurrentIndexActiveMenu(resultPieceIndex);
    setRotation(newRotation);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    document.body.style.overflow = '';
    const snappedRotation = Math.round(rotation / slicedAngle) * slicedAngle;

    setRotation(snappedRotation);
  };

  const getAngle = (x: number, y:number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(y - cy, x - cx) * (180 / Math.PI);
  };

  const handleClick = (index:number, event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const indexDiff = index - currentIndexActiveMenu;
    event.currentTarget.blur();
    event.preventDefault();
    if(indexDiff === 0) return;

    setShowOption(false);

    const rotationDiff = slicedAngle * indexDiff;
    const normalizedRotationDiff = Math.abs(rotationDiff) > 90
      ? (360 - Math.abs(rotationDiff)) * (indexDiff > 0 ? -1 : 1)
      : rotationDiff;
    const newRotation = rotation - normalizedRotationDiff;
    const direction = indexDiff > 1 
      ? -(visibleCount - indexDiff) 
      : indexDiff < -2
        ? 2*visibleCount - (visibleCount - indexDiff)
        : indexDiff;

    setCurrentIndex(prev => (prev + direction + MENUS.length) % MENUS.length);
    setCurrentIndexActiveMenu(index);
    setRotation(newRotation);
  };

  function getDirection(prevIndex: number, currentIndex: number) {
    if (prevIndex === currentIndex) return 0;
  
    // Handling forward movement
    if (
      (currentIndex === (prevIndex + 1) % 8) || // Normal forward
      (prevIndex === 7 && currentIndex === 0)  // Wrap-around forward
    ) {
      return 1;
    }
  
    // Handling backward movement
    if (
      (currentIndex === (prevIndex - 1 + 8) % 8) || // Normal backward
      (prevIndex === 0 && currentIndex === 7)  // Wrap-around backward
    ) {
      return -1;
    }
  
    return 0;
  }

  function getVisibleIndices() { 
    let result = [];
    const gap = MENUS.length - visibleCount;
    const positiveItems = Array.from({ length: 4 }, (_, i) => MENUS[(currentIndex + i) % MENUS.length]);
    const negativeItems = Array.from({ length: 4 }, (_, i) => MENUS[(currentIndex + 4 + gap + i) % MENUS.length]);
  
    for (let i = 0; i < visibleCount; i++) {
      if (i < 4) {
        result[(currentIndexActiveMenu + i) % 8] = positiveItems[i];
      } else {
        result[(currentIndexActiveMenu + i) % 8] = negativeItems[i-4];
      }
    }

    return result;
  }

  useEffect(() => {
    setVisibleMenu(getVisibleIndices);
  }, []);

  useEffect(() => {
    if (MENUS.length > visibleCount) {
      setVisibleMenu(getVisibleIndices);
    }
    setShowOption(MENUS_DETAIL[currentIndex]?.length > 0);
  }, [currentIndex]);

  const svgRef = useRef<SVGSVGElement>(null);

  const createSlice = (index: number) => {
    const angle = ((index * 360) / slices) + 180;
    const midAngle = angle + slicedAngle / 2;
    const textAngle = midAngle + 180;
    
    const x1 = centerX + radius * Math.cos(angle * (Math.PI / 180));
    const y1 = centerY + radius * Math.sin(angle * (Math.PI / 180));
    const x2 = centerX + radius * Math.cos(((angle + slicedAngle) * Math.PI) / 180); 
    const y2 = centerY + radius * Math.sin(((angle + slicedAngle) * Math.PI) / 180);
    const textX = (centerX + x1 + x2) / 3;
    const textY = (centerY + y1 + y2) / 3;
 
    return (
      <g
        key={index}
        onClick={(e) => handleClick(index, e)}
        focusable="false"
        style={{
          cursor: 'pointer',
        }}>
        <path
          d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
          fill={COLORS[currentIndexActiveMenu === index ? 2 : 1]}
          stroke={COLORS[0]}
          strokeWidth={strokeWidth}
          focusable="false"
          />
        <text
          x={(centerX + x1 + x2) / 3}
          y={(centerY + y1 + y2) / 3}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="5"
          fill={currentIndexActiveMenu === index ? 'white' : COLORS[2]} 
          fontWeight="bold"
          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
          style={{ pointerEvents: 'none' }}
        >
          {visibleMenu[index]}
        </text>
      </g>
    )
  }

  return (
    <div className={styles.root} style={{ height: `${size-40}px`}}>
      {showOption ? (
        <div>
          <div className={styles['header-detail-menu']}>
            <h3>{MENUS[currentIndex]}</h3>
            <svg className={styles['animated-line']} width="200" height="120" viewBox="0 0 200 120">
              <path id="line" d="M165 105 L138.53 42.38 L0 42.38" fill="none" stroke="black" stroke-width="1"/>
              <circle id="dot" cx="164" cy="103" r="3" fill="black" />
            </svg>
          </div>
          <ul>
            {MENUS_DETAIL[currentIndex].map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      ) : ''}
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`
          ${-radius - padding}
          ${-radius - padding}
          ${2 * (radius + padding)}
          ${2 * (radius + padding)}
        `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDraggingRef.current ? 'none' : 'transform 0.2s ease-in-out',
          touchAction: 'none',
          right: `-${size / 2}px`
        }}
      >
        <g>
          {Array.from({ length: slices }, (_, index) => createSlice(index))}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.35}
            fill="white"
            stroke={COLORS[0]}
            strokeWidth={strokeWidth}
          />
        </g>
      </svg>
    </div>
  )
}

export default InfiniteMenu