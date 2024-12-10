import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const giftIdeas = [
  "Une boîte de chocolats fins",
  "Un livre de poche bestseller",
  "Une bougie parfumée artisanale",
  "Un mug personnalisé",
  "Un puzzle original",
  "Une paire de chaussettes rigolotes",
  "Un porte-clés design",
  "Un carnet de notes élégant",
  "Un jeu de cartes unique",
  "Un calendrier personnalisé",
  "Une plante grasse décorative",
  "Un porte-monnaie compact",
  "Un set de badges collector",
  "Un lot de produits de soin bio",
  "Un mini jeu de société"
];

const GiftSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = () => {
    const shuffled = [...giftIdeas].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 5));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="mt-4 border-christmas-gold text-christmas-gold hover:bg-christmas-gold/10"
          onClick={generateSuggestions}
        >
          Je n'ai pas d'idée 🎁
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-christmas-gold">
            Suggestions de cadeaux à ~20€
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-white/5 border border-christmas-gold/20"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftSuggestions;