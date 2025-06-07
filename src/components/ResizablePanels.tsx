
import { useState, useRef, useCallback, useEffect } from "react";

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
    <div ref={containerRef} className="flex h-full">
      <div style={{ width: `${leftWidth}%` }} className="bg-white rounded-lg shadow-sm border border-gray-200">
        {leftPanel}
      </div>
      
      <div 
        className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize transition-colors"
        onMouseDown={handleLeftMouseDown}
      />
      
      <div style={{ width: `${centerWidth}%` }} className="bg-white rounded-lg shadow-sm border border-gray-200 mx-1">
        {centerPanel}
      </div>
      
      <div 
        className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize transition-colors"
        onMouseDown={handleRightMouseDown}
      />
      
      <div style={{ width: `${rightWidth}%` }} className="bg-white rounded-lg shadow-sm border border-gray-200">
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanels;
