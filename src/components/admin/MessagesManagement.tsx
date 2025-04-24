
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export function MessagesManagement() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de marquer le message comme lu",
        variant: "destructive"
      });
    } else {
      fetchMessages();
      toast({
        title: "Succès",
        description: "Message marqué comme lu"
      });
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Messages des visiteurs</h2>
        <input
          type="text"
          placeholder="Rechercher dans les messages..."
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg border ${message.read ? 'bg-gray-50' : 'bg-white border-consom'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{message.name}</h3>
                    <p className="text-sm text-gray-600">{message.email}</p>
                  </div>
                  {!message.read && (
                    <Badge variant="secondary">Nouveau</Badge>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{message.message}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {!message.read && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsRead(message.id)}
                    >
                      Marquer comme lu
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Aucun message trouvé
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
