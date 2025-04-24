
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function MessageForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('messages')
      .insert([{ message }]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer votre message",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Votre message a été envoyé"
      });
      setMessage("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <Textarea
        placeholder="Votre message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="min-h-[120px]"
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Envoi en cours..." : "Envoyer"}
      </Button>
    </form>
  );
}
