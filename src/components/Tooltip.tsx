import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <Tippy 
      content={content}
      theme="translucent"
      placement="bottom"
      arrow={true}
      duration={200}
      delay={[100, 0]}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;