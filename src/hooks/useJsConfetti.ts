"use client";

import { useEffect, useState, useCallback } from 'react';
import JSConfetti from 'js-confetti';

interface UseJsConfettiResult {
  fireConfetti: () => void;
  isConfettiReady: boolean;
}

const useJsConfetti = (): UseJsConfettiResult => {
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);
  const [isConfettiReady, setIsConfettiReady] = useState(false);

  useEffect(() => {
    // Initialize JSConfetti only on the client side
    if (typeof window !== 'undefined') {
      const confetti = new JSConfetti();
      setJsConfetti(confetti);
      setIsConfettiReady(true);
    }
  }, []);

  const fireConfetti = useCallback(() => {
    if (jsConfetti) {
      jsConfetti.addConfetti({
        confettiColors: [
          '#fce18a', '#ff726d', '#b48aed', '#6366f1', '#0ea5e9',
        ],
        confettiRadius: 5,
        confettiNumber: 200,
      });
    }
  }, [jsConfetti]);

  return { fireConfetti, isConfettiReady };
};

export default useJsConfetti;
