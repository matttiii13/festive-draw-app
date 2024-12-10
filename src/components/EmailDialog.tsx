import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: { name: string } | null;
  onResult: (result: string) => void;
}

const EmailDialog = ({ open, onOpenChange, participant, onResult }: EmailDialogProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participant) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('participants')
        .select()
        .eq('name', participant.name)
        .single();

      if (error) throw error;

      if (data.consulted) {
        toast.error('Ce nom a déjà été consulté !');
        onOpenChange(false);
        return;
      }

      await supabase
        .from('participants')
        .update({ consulted: true, email })
        .eq('name', participant.name);

      onResult(data.result);
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {participant ? `Entrez votre email, ${participant.name}` : 'Sélectionnez un participant'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ton email"
            required
          />
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-christmas-red hover:bg-christmas-red/90"
          >
            Découvrir mon résultat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;