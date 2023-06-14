import { useRef } from 'react';

// 특정 스크롤로 이동시키는 hook
function useMoveScroll() {
  const element = useRef(null);

  const onMoveToElement = () => {
    element.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return { element, onMoveToElement };
}

export default useMoveScroll;
