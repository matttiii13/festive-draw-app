const SnowAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-snowfall text-white opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${Math.random() * 10 + 5}px`
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default SnowAnimation;