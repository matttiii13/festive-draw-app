import { useState, useEffect } from 'react';

const GiftReveal = ({ result }: { result: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div
        className={`absolute inset-0 transition-transform duration-1000 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        🎁
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-2xl font-christmas text-christmas-red">
          Tu dois offrir un cadeau à:<br />
          <span className="text-3xl font-bold text-christmas-gold">
            {result}
          </span>
        </p>
      </div>
    </div>
  );
};

export default GiftReveal;