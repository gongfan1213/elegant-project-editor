import { useState, useRef, useCallback, useEffect } from "react";
import styles from "@/styles/ResizablePanels.module.css";

interface ResizablePanelsProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

const ResizablePanels = ({ leftPanel, centerPanel, rightPanel }: ResizablePanelsProps) => {
  const [leftWidth, setLeftWidth] = useState(25);
  const [rightWidth, setRightWidth] = useState(25);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  const handleLeftMouseDown = useCallback(() => {
    isDraggingLeft.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleRightMouseDown = useCallback(() => {
    isDraggingRight.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    if (isDraggingLeft.current) {
      const newLeftWidth = Math.max(15, Math.min(40, (mouseX / containerWidth) * 100));
      setLeftWidth(newLeftWidth);
    }
    
    if (isDraggingRight.current) {
      const rightX = containerWidth - mouseX;
      const newRightWidth = Math.max(15, Math.min(40, (rightX / containerWidth) * 100));
      setRightWidth(newRightWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const centerWidth = 100 - leftWidth - rightWidth;

  return (
    <div ref={containerRef} className={styles.container}>
      <div style={{ width: `${leftWidth}%` }} className={styles.leftPanel}>
        {leftPanel}
      </div>
      
      <div 
        className={styles.resizeHandle}
        onMouseDown={handleLeftMouseDown}
      />
      
      <div style={{ width: `${centerWidth}%` }} className={styles.centerPanel}>
        {centerPanel}
      </div>
      
      <div 
        className={styles.resizeHandle}
        onMouseDown={handleRightMouseDown}
      />
      
      <div style={{ width: `${rightWidth}%` }} className={styles.rightPanel}>
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanels;
