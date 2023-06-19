import { useEffect, useState } from 'react';

// min and max inclusive (https://stackoverflow.com/a/7228322/20688860)
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function RainBackground({numberOfRainElements = 30}: {numberOfRainElements?: number}) {
  const [rainElements, setRainElements] = useState<React.ReactNode[]>([]);
  const [rainBackRowElements, setRainBackRowElements] = useState<React.ReactNode[]>([]);

  const generateRainDropElement = (x: number, isBackdrop: boolean) => {
    const randomBottom = randomIntFromInterval(2, 5) * 2 + 100 - 1;
    const randomDuration = randomIntFromInterval(1, 98);
    return (
      <div className="drop" key={x} style={{
        ...(!isBackdrop && {left: `${x}%`}),
        ...(isBackdrop && {right: `${x}%`}),
        bottom: `${randomBottom}%`,
        animationDelay: `0.${randomDuration}s`,
        animationDuration: `0.6${randomDuration}s`,
      }}>
        <div className="stem" style={{
          animationDelay: `0.${randomDuration}s`,
          animationDuration: `0.6${randomDuration}s`
        }}></div>
        <div className="splat" style={{
          animationDelay: `0.${randomDuration}s`,
          animationDuration: `0.6${randomDuration}s`
        }}></div>
      </div>
    );
  };

  useEffect(() => {
    setRainElements([]);
    setRainBackRowElements([]);
    const newRainElements = [];
    const newRainBackElements = [];

    for (let i = 0; i < numberOfRainElements; i++) {
      i += randomIntFromInterval(2, 5);
      newRainElements.push(generateRainDropElement(i * 100 / numberOfRainElements, false));
    }

    for (let i = 0; i < numberOfRainElements; i++) {
      i += randomIntFromInterval(2, 5);
      newRainBackElements.push(generateRainDropElement(i * 100 / numberOfRainElements, true));
    }

    setRainElements(newRainElements);
    setRainBackRowElements(newRainBackElements);
  }, []);

  return (
    <div className="back-row-toggle splat-toggle" aria-hidden="true" style={{pointerEvents: 'none'}}>
      <div className="rain front-row">
        {rainElements}
      </div>
      <div className="rain back-row">
        {rainBackRowElements}
      </div>
    </div>
  )
}
