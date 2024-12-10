import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

const ConsultForm = ({ onResult }: { onResult: (result: string) => void }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('participants')
        .select()
        .eq('name', name)
        .single();

      if (error) throw error;

      if (data.consulted) {
        toast.error('Ce nom a déjà été consulté !');
        return;
      }

      await supabase
        .from('participants')
        .update({ consulted: true, email })
        .eq('name', name);

      onResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <Select
            value={name}
            onValueChange={setName}
            placeholder="Sélectionne ton nom"
          >
            <option value="Le Mati">Le Mati</option>
            <option value="Le Yo">Le Yo</option>
            {/* ... autres noms */}
          </Select>
          <Button 
            onClick={() => name && setStep(2)}
            className="w-full bg-christmas-green hover:bg-christmas-green/90"
          >
            Suivant
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
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
        </div>
      )}
    </form>
  );
};

export default ConsultForm;