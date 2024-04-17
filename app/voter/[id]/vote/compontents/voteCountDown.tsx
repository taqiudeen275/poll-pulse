import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetTime: string;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const parsedTargetTime = parseISOString(targetTime);

    const updateTimeRemaining = () => {
      const now = new Date();
      const diff = parsedTargetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining({ hours, minutes, seconds });
      }
    };

    const interval = setInterval(updateTimeRemaining, 1000);

    updateTimeRemaining();

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div>
      {timeRemaining ? (
        <span className='text-6xl'>
          <span className='text-blue-400'>{timeRemaining.hours}</span><span className='text-orange-500 text-5xl'>:{padZero(timeRemaining.minutes)}</span>
          <span className='text-red-500 text-3xl'>:{padZero(timeRemaining.seconds)}</span>
        </span>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

const parseISOString = (s: string): Date => {
  const b = s.split(/\D+/);
  return new Date(Date.UTC(+b[0], +b[1] - 1, +b[2], +b[3], +b[4], +b[5], +b[6]));
};

const padZero = (value: number): string => {
  return value.toString().padStart(2, '0');
};

export default Countdown;