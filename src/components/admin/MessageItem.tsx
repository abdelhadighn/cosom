
import { Button } from "@/components/ui/button";

interface MessageItemProps {
  message: {
    id: string;
    message: string;
    read: boolean;
    sent_at: string;
  };
  onMarkAsRead: (id: string) => void;
}

export function MessageItem({ message, onMarkAsRead }: MessageItemProps) {
  return (
    <div className={`p-4 rounded-lg border ${message.read ? 'bg-gray-50' : 'bg-white border-consom'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="text-gray-700">{message.message}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          {new Date(message.sent_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
}
