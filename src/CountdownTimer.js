import React, { useState, useEffect } from "react";

const CountdownTimer = ({ duration, onTimeout }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        // Lorsque le compte à rebours atteint 0, appeler onTimeout
        if (timeLeft === 0) {
            onTimeout();
            return;
        }

        // Décrémenter le compte à rebours chaque seconde
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // Nettoyer le timer
        return () => clearTimeout(timer);
    }, [timeLeft, onTimeout]);

    // Affichage du temps restant ou du message 'Ouvert!'
    return <div>{timeLeft > 0 ? `${timeLeft} secondes` : "Ouvert!"}</div>;
};

export default CountdownTimer;
