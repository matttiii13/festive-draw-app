import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ReviewResult = ({ onResult }: { onResult: (result: string) => void }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('participants')
        .select()
        .eq('email', email)
        .single();

      if (error) throw error;

      if (!data.consulted) {
        toast.error('Aucun résultat trouvé pour cet email');
        return;
      }

      onResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        className="w-full bg-christmas-gold hover:bg-christmas-gold/90"
      >
        Revoir mon résultat
      </Button>
    </form>
  );
};

export default ReviewResult;