import { useState, useEffect } from 'react';
import SnowAnimation from '@/components/SnowAnimation';
import ReviewResult from '@/components/ReviewResult';
import GiftReveal from '@/components/GiftReveal';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import EmailDialog from '@/components/EmailDialog';

const Index = () => {
  const [mode, setMode] = useState<'start' | 'review' | 'result'>('start');
  const [result, setResult] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Array<{ name: string, consulted: boolean }>>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select('name, consulted')
        .order('name');
      
      if (error) {
        console.error('Error fetching participants:', error);
        return;
      }
      
      setParticipants(data);
    };

    fetchParticipants();
  }, [mode, dialogOpen]); // Refresh when mode or dialog state changes

  const handleResult = (newResult: string) => {
    setResult(newResult);
    setMode('result');
  };

  const handleCardClick = (participant: { name: string, consulted: boolean }) => {
    if (!participant.consulted) {
      setSelectedParticipant({ name: participant.name });
      setDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-christmas-green to-christmas-green/90 text-white relative overflow-hidden">
      <SnowAnimation />
      
      <div className="container max-w-4xl mx-auto pt-20 px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-christmas text-center mb-8 text-christmas-gold">
          🎄 Tirage au Sort de Noël 🎄
        </h1>

        {mode === 'start' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {participants.map((participant) => (
                <Card 
                  key={participant.name}
                  onClick={() => handleCardClick(participant)}
                  className={`p-4 text-center transition-all cursor-pointer ${
                    participant.consulted 
                      ? 'bg-gray-300/20 text-gray-400'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <p className="font-medium">{participant.name}</p>
                  <p className="text-sm mt-1">
                    {participant.consulted ? '✓ A participé' : 'En attente'}
                  </p>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => setMode('review')}
                variant="outline"
                className="text-christmas-gold hover:text-christmas-gold/90"
              >
                Revoir mon résultat
              </Button>
            </div>
          </>
        )}

        {mode === 'review' && (
          <ReviewResult onResult={handleResult} />
        )}

        {mode === 'result' && result && (
          <div className="text-center">
            <GiftReveal result={result} />
            <Button
              onClick={() => setMode('start')}
              variant="outline"
              className="mt-8 text-christmas-gold hover:text-christmas-gold/90"
            >
              Retour à l'accueil
            </Button>
          </div>
        )}
      </div>

      <EmailDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        participant={selectedParticipant}
        onResult={handleResult}
      />
    </div>
  );
};

export default Index;