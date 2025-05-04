
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface MessageItemProps {
  message: {
    id: string;
    message: string;
    read: boolean;
    sent_at: string;
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MessageItem({ message, onMarkAsRead, onDelete }: MessageItemProps) {
  const handleDelete = () => {
    // Confirm before deleting
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      onDelete(message.id);
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border ${message.read ? 'bg-gray-50' : 'bg-white border-consom'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="text-gray-700">{message.message}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
