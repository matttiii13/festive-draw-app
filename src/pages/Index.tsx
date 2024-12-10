import { useState } from 'react';
import SnowAnimation from '@/components/SnowAnimation';
import ConsultForm from '@/components/ConsultForm';
import ReviewResult from '@/components/ReviewResult';
import GiftReveal from '@/components/GiftReveal';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [mode, setMode] = useState<'start' | 'consult' | 'review' | 'result'>('start');
  const [result, setResult] = useState<string | null>(null);

  const handleResult = (newResult: string) => {
    setResult(newResult);
    setMode('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-christmas-green to-christmas-green/90 text-white relative overflow-hidden">
      <SnowAnimation />
      
      <div className="container max-w-md mx-auto pt-20 px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-christmas text-center mb-8 text-christmas-gold">
          🎄 Tirage au Sort de Noël 🎄
        </h1>

        {mode === 'start' && (
          <div className="space-y-4">
            <Button
              onClick={() => setMode('consult')}
              className="w-full bg-christmas-red hover:bg-christmas-red/90 text-xl py-6"
            >
              🎁 Consulter mon résultat
            </Button>
            <Button
              onClick={() => setMode('review')}
              variant="outline"
              className="w-full text-christmas-gold hover:text-christmas-gold/90"
            >
              Revoir mon résultat
            </Button>
          </div>
        )}

        {mode === 'consult' && (
          <ConsultForm onResult={handleResult} />
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
    </div>
  );
};

export default Index;