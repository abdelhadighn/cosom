
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { MessageDateFilter } from "./MessageDateFilter";
import { MessageSearchInput } from "./MessageSearchInput";
import { MessageItem } from "./MessageItem";

export function MessagesManagement() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });

  useEffect(() => {
    fetchMessages();
  }, [dateRange]);

  const fetchMessages = async () => {
    let query = supabase
      .from('messages')
      .select('*')
      .order('sent_at', { ascending: false });

    if (dateRange.from) {
      query = query.gte('sent_at', dateRange.from.toISOString());
    }
    if (dateRange.to) {
      query = query.lte('sent_at', dateRange.to.toISOString());
    }

    const { data, error } = await query;

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
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Messages des visiteurs</h2>
          <div className="flex gap-4">
            <MessageSearchInput 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <MessageDateFilter 
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <MessageItem 
                key={message.id}
                message={message}
                onMarkAsRead={markAsRead}
              />
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
