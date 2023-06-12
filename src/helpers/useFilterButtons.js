import { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

function useFilterButtons() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleOnClickShareBtn = (link) => {
    setIsLinkCopied(true);
    clipboardCopy(link);
    const intervalTime = 3000;
    setTimeout(() => { setIsLinkCopied(false); }, intervalTime);
  };

  return {
    handleOnClickShareBtn,
    isLinkCopied,
  };
}

export default useFilterButtons;
