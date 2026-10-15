'use client';

import React, { useState, useEffect } from 'react';
import { VanRakshakLogo } from './VanRakshakLogo';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ durationMs = 3200 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Booting acoustic intelligence...');

  useEffect(() => {
    const intervalTime = 50;
    const stepIncrement = 100 / (durationMs / intervalTime);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + stepIncrement);
        if (next < 30) {
          setStatusMessage('Calibrating I2S Microphone...');
        } else if (next < 65) {
          setStatusMessage('Loading TinyML Model...');
        } else if (next < 90) {
          setStatusMessage('Connecting LoRa Gateway...');
        } else {
          setStatusMessage('Forest Grid Ready.');
        }
        return next;
      });
    }, intervalTime);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, durationMs - 450);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
    }, durationMs);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => setIsVisible(false), 250);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.splashOverlay} ${isFading ? styles.fadeOut : ''}`}>
      <button className={styles.skipBtn} onClick={handleSkip} title="Skip startup screen">
        Skip &rarr;
      </button>

      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoAura} />
          <VanRakshakLogo size={92} />
        </div>

        <div className={styles.titleHindi}>वनरक्षक</div>
        <h1 className={styles.titleEng}>VANRAKSHAK</h1>
        <div className={styles.subtitle}>
          Acoustic Forest Defense &amp; LoRa Grid
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.statusTicker}>
            <div className={styles.tickerText}>
              <span className={styles.tickerDot}></span>
              <span>{statusMessage}</span>
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
