import React, { useRef, useState } from 'react'

interface Props {
  className?: string;
  size?: number;
}
function InfiniteMenu(props: Props) {
  const { className, size=300 } = props;
  const slices = 6;
  const slicedAngle = 360 / slices;
  const radius = 50;
  const strokeWidth = 1;
  const padding = strokeWidth / 2;
  const centerX = 0;
  const centerY = 0;
  const colors = ["#8aafe3", "#66a0f2"];
  const menus = ["Home", "About", "Services", "Portfolio", "Contact", "Blog"];

  const [rotation, setRotation] = useState(0);
  const startAngleRef = useRef(0);
  const isDraggingRef = useRef(false);

  const lastAngleRef = useRef(0);

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    isDraggingRef.current = true;
    const { clientX, clientY } = event;
    startAngleRef.current = getAngle(clientX, clientY);
    lastAngleRef.current = rotation;
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if(!isDraggingRef.current) return;

    event.preventDefault();
    const { clientX, clientY } = event;
    const currentAngle = getAngle(clientX, clientY);
    const angleDiff = currentAngle - startAngleRef.current;

    setRotation(lastAngleRef.current + angleDiff);
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

  const handleClick = (menu: string) => alert(`You clicked Menu ${menu}`);

  const svgRef = useRef<SVGSVGElement>(null);

  const createSlice = (index: number) => {
    const angle = (index * 360) / slices;
    const midAngle = angle + slicedAngle / 2;
    const textAngle = midAngle + 180;
    
    const x1 = centerX + radius * Math.cos(angle * (Math.PI / 180));
    const y1 = centerY + radius * Math.sin(angle * (Math.PI / 180));
    const x2 = centerX + radius * Math.cos(((angle + 60) * Math.PI) / 180); 
    const y2 = centerY + radius * Math.sin(((angle + 60) * Math.PI) / 180);
    const textX = (centerX + x1 + x2) / 3;
    const textY = (centerY + y1 + y2) / 3;

    return (
      <g key={index} onClick={() => handleClick(menus[index])} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
          fill={colors[index % 2]}
          stroke="black"
          strokeWidth={strokeWidth}
        />
        <text
          x={(centerX + x1 + x2) / 3}
          y={(centerY + y1 + y2) / 3}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="5"
          fill="white"
          fontWeight="bold"
          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
          style={{ pointerEvents: 'none' }}
        >
          {menus[index]}
        </text>
      </g>
    )
  }

  return (
    <svg
      className={className}
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
        transform: `rotate(${rotation+12}deg)`,
        transition: isDraggingRef.current ? 'none' : 'transform 0.2s ease-in-out',
        touchAction: 'none',
      }}
    >
      <g>
        {Array.from({ length: slices }, (_, index) => createSlice(index))}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.2}
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}

export default InfiniteMenu