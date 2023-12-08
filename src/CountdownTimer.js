import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Nettoyer le timer
    return () => clearTimeout(timer);
  });

  // Fonction pour calculer le temps restant
  function calculateTimeLeft(date) {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Formatage du temps restant
  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Temps écoulé!</span>}
    </div>
  );
};

export default CountdownTimer;
