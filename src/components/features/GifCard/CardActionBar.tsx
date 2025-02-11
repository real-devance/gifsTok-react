import { ThumbsUp, Share2, Download } from 'lucide-react';
import CardActionsButton from './CardActionsButton'; 

type CardActionBarProps = {
  isLiked: boolean; 
  onLike: () => void; 
  onShare: () => void; 
  onDownload: () => void; 
};

function CardActionBar({ isLiked, onLike, onShare, onDownload }: CardActionBarProps) {
  // Defines the action buttons with their labels, icons, and handlers
  const actionBtns = [
    { 
      label: 'Like', 
      icon: <ThumbsUp size={20} className={`icon ${isLiked && '!text-red-500'}`} />, 
      onClick: onLike 
    },
    { 
      label: 'Share', 
      icon: <Share2 size={20} className="icon" />, 
      onClick: onShare 
    },
    { 
      label: 'Download', 
      icon: <Download size={20} className="icon" />, 
      onClick: onDownload 
    },
  ];

  return (
    <div className="grid gap-2">
      {actionBtns.map((btn) => (
        <CardActionsButton
          key={btn.label} 
          label={btn.label} 
          onClick={btn.onClick} 
          icon={btn.icon} 
        />
      ))}
    </div>
  );
}

export default CardActionBar;
