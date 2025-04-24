
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

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
            <input
              type="text"
              placeholder="Rechercher dans les messages..."
              className="w-64 p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "P")} - {format(dateRange.to, "P")}
                      </>
                    ) : (
                      format(dateRange.from, "P")
                    )
                  ) : (
                    "Sélectionner les dates"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range: any) => {
                    setDateRange(range);
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

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
                  <div className="flex-1">
                    <p className="text-gray-700">{message.message}</p>
                  </div>
                  {!message.read && (
                    <Badge variant="secondary">Nouveau</Badge>
                  )}
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
