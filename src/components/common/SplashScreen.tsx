'use client';

import React, { useState, useEffect } from 'react';
import { VanRakshakLogo } from './VanRakshakLogo';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ durationMs = 3500 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing I2S Acoustic Subsystem...');

  useEffect(() => {
    const intervalTime = 50;
    const stepIncrement = 100 / (durationMs / intervalTime);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + stepIncrement);
        if (next < 25) {
          setStatusMessage('Calibrating INMP441 Acoustic DMA (16kHz)...');
        } else if (next < 55) {
          setStatusMessage('Deploying INT8 TinyML Mel-CNN Model (68.4 KB)...');
        } else if (next < 80) {
          setStatusMessage('Locking Sub-GHz LoRa Concentrator (865.2 MHz)...');
        } else if (next < 98) {
          setStatusMessage('Mounting Satpura Reserve GIS Canopy Topo...');
        } else {
          setStatusMessage('Canopy Protection Grid Synchronized.');
        }
        return next;
      });
    }, intervalTime);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, durationMs - 600);

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
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.splashOverlay} ${isFading ? styles.fadeOut : ''}`}>
      <button className={styles.skipBtn} onClick={handleSkip} title="Skip startup sequence">
        Skip Intro &rarr;
      </button>

      <div className={styles.contentWrapper}>
        {/* Animated Sovereign Shield Emblem with Acoustic Pulse Rings & Radar Arc */}
        <div className={styles.logoWrapper}>
          <div className={`${styles.rippleRing} ${styles.ring1}`} />
          <div className={`${styles.rippleRing} ${styles.ring2}`} />
          <div className={`${styles.rippleRing} ${styles.ring3}`} />
          <div className={styles.radarSweep} />
          <VanRakshakLogo size={96} animated={true} />
        </div>

        {/* Sanskrit & English Brand Identity */}
        <div className={styles.titleHindi}>वनरक्षक</div>
        <h1 className={styles.titleEng}>VANRAKSHAK</h1>
        <div className={styles.subtitle}>
          Acoustic TinyML &amp; Sub-GHz LoRa Forest Guard
        </div>

        {/* Progress Bar & Diagnostics */}
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
            <span className="mono" style={{ color: '#9cb3a6' }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
