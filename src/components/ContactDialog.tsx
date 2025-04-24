
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";

export function ContactDialog() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="consom" size="lg" className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Nous Contacter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyez-nous un message</DialogTitle>
          <DialogDescription>
            Nous vous répondrons dans les plus brefs délais.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
      </DialogContent>
    </Dialog>
  );
}
