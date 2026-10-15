'use client';

import React, { useState } from 'react';
import { DEMO_AUDIO_BENCHMARKS } from '@/lib/demo-data';
import { AudioBenchmarkSample } from '@/types';
import { ThreatPill } from '@/components/common/ThreatPill';
import { DataOriginBadge } from '@/components/common/DataOriginBadge';
import styles from './audio-detection.module.css';

export default function AudioDetectionPage() {
  const [selectedSample, setSelectedSample] = useState<AudioBenchmarkSample>(
    DEMO_AUDIO_BENCHMARKS[0]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSimulateInference = (sample: AudioBenchmarkSample) => {
    setSelectedSample(sample);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            AI Sound Detection &amp; TinyML Inspector
            <DataOriginBadge isSimulated={true} size="sm" label="Calibrated Benchmark" />
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            On-device acoustic feature extraction (32 Mel bands) and INT8 quantized CNN evaluation for ESP32-S3.
          </p>
        </div>
      </div>

      {/* TinyML Edge Hardware Benchmark Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>Quantized Model Size</div>
          <div className={styles.metricVal}>68.4 KB</div>
          <div className={styles.metricSub}>TFLite Micro INT8 Weights</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>Inference Execution Time</div>
          <div className={styles.metricVal}>42 ms</div>
          <div className={styles.metricSub}>Xtensa LX7 Vector SIMD @ 240MHz</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>Feature Extraction (MFCC)</div>
          <div className={styles.metricVal}>28 ms</div>
          <div className={styles.metricSub}>32-Band Mel-Filterbank Window</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>Alert Trigger Cutoff</div>
          <div className={styles.metricVal}>&ge; 0.82</div>
          <div className={styles.metricSub}>Calibrated Softmax Threshold</div>
        </div>
      </div>

      {/* Acoustic Workbench */}
      <div className={styles.workbenchGrid}>
        {/* Sample Selector */}
        <div className={styles.panel}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
            Benchmark Acoustic Profiles
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Select a verified sound sample to inspect its frequency distribution against our trained CNN model:
          </p>

          <div className={styles.sampleList}>
            {DEMO_AUDIO_BENCHMARKS.map((sample) => {
              const isSelected = selectedSample.id === sample.id;
              return (
                <div
                  key={sample.id}
                  className={`${styles.sampleItem} ${isSelected ? styles.sampleItemActive : ''}`}
                  onClick={() => handleSimulateInference(sample)}
                >
                  <div className={styles.sampleHeader}>
                    <div className={styles.sampleTitle}>{sample.name}</div>
                    {sample.isThreat ? (
                      <ThreatPill threatType={sample.category as any} />
                    ) : (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--accent-emerald-bright)',
                          backgroundColor: 'var(--threat-safe-bg)',
                          padding: '2px 6px',
                          borderRadius: '3px',
                        }}
                      >
                        Ambient Bio-sound
                      </span>
                    )}
                  </div>
                  <div className={styles.sampleDesc}>{sample.description}</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      marginTop: '4px',
                    }}
                  >
                    <span>Peak: {sample.peakFrequencyHz} Hz</span>
                    <span className="mono">
                      Conf: {(sample.benchmarkConfidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spectrogram & Inference Display */}
        <div className={styles.panel}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '12px',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                {selectedSample.name}
              </div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Duration: {selectedSample.durationSec}s • Peak Acoustic Energy: {selectedSample.splDb} dB SPL
              </div>
            </div>

            <button
              onClick={() => handleSimulateInference(selectedSample)}
              style={{
                backgroundColor: isPlaying ? 'var(--threat-critical)' : 'var(--accent-emerald-dim)',
                color: isPlaying ? '#ffffff' : 'var(--accent-emerald-bright)',
                border: `1px solid ${isPlaying ? 'var(--threat-critical)' : 'var(--accent-emerald)'}`,
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              {isPlaying ? (
                <>
                  <span className="pulse-critical" style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                  Processing DMA...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Run Edge Inference
                </>
              )}
            </button>
          </div>

          {/* 32-Band Mel Spectrogram Visualizer */}
          <div className={styles.spectrogramContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>32-Band Mel Filterbank Energy (100 Hz &rarr; 8000 Hz)</span>
              <span className="mono">Peak Harmonic: {selectedSample.peakFrequencyHz} Hz</span>
            </div>

            <div className={styles.spectrogramBars}>
              {selectedSample.melBands.map((val, idx) => {
                const heightPct = Math.max(val, 6);
                const isHarmonicPeak = val > 75;
                return (
                  <div
                    key={idx}
                    className={styles.freqBar}
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: isHarmonicPeak
                        ? selectedSample.isThreat
                          ? 'var(--threat-critical)'
                          : '#38bdf8'
                        : 'var(--accent-emerald)',
                    }}
                    title={`Mel Bin ${idx + 1}: ${val}% energy`}
                  />
                );
              })}
            </div>

            {/* Model Confidence Output Gauge */}
            <div
              style={{
                backgroundColor: 'var(--bg-panel-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: '6px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  TinyML Softmax Confidence:
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color:
                      selectedSample.benchmarkConfidence >= 0.82
                        ? 'var(--threat-critical)'
                        : selectedSample.benchmarkConfidence > 0.4
                        ? 'var(--threat-warning)'
                        : 'var(--accent-emerald-bright)',
                  }}
                >
                  {(selectedSample.benchmarkConfidence * 100).toFixed(1)}%
                </span>
              </div>

              {/* Progress Bar with Threshold Marker */}
              <div style={{ position: 'relative', width: '100%', height: '12px', backgroundColor: 'var(--bg-base)', borderRadius: '6px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${selectedSample.benchmarkConfidence * 100}%`,
                    backgroundColor:
                      selectedSample.benchmarkConfidence >= 0.82
                        ? 'var(--threat-critical)'
                        : 'var(--accent-emerald)',
                    transition: 'width 0.4s ease',
                  }}
                />
                {/* 82% Threshold Marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '82%',
                    width: '2px',
                    backgroundColor: '#ffffff',
                    zIndex: 2,
                  }}
                  title="Detection Threshold (0.82)"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span>0% Ambient Noise</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Threshold: 82%</span>
                <span>100% Deterministic Match</span>
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: selectedSample.benchmarkConfidence >= 0.82 ? 'var(--threat-critical)' : 'var(--text-secondary)',
                  fontWeight: selectedSample.benchmarkConfidence >= 0.82 ? 600 : 400,
                  marginTop: '4px',
                }}
              >
                {selectedSample.benchmarkConfidence >= 0.82
                  ? '⚡ TRIGGER CONDITION MET: Edge node will immediately awaken SX1262 LoRa module and broadcast a 16-byte alert packet.'
                  : '✓ BELOW THRESHOLD: Sound classified as non-threat ambient acoustic event. No radio transmission emitted; deep sleep retained.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Walkthrough */}
      <div className={styles.pipelineFlow}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
          ESP32-S3 Edge Acoustic Processing Pipeline
        </div>
        <div className={styles.pipelineSteps}>
          <div className={styles.pipelineStep}>
            <span className={styles.stepNum}>STEP 01</span>
            <span className={styles.stepTitle}>I2S DMA Audio Capture</span>
            <span className={styles.stepDetail}>
              INMP441 MEMS mic streams 16 kHz 24-bit PCM mono samples into ping-pong DMA buffers.
            </span>
          </div>

          <div className={styles.pipelineStep}>
            <span className={styles.stepNum}>STEP 02</span>
            <span className={styles.stepTitle}>Mel-Filterbank FFT</span>
            <span className={styles.stepDetail}>
              Applies Hanning windowing and calculates 32 log Mel-frequency spectral energies.
            </span>
          </div>

          <div className={styles.pipelineStep}>
            <span className={styles.stepNum}>STEP 03</span>
            <span className={styles.stepTitle}>INT8 CNN Inference</span>
            <span className={styles.stepDetail}>
              TFLite Micro runs quantized convolutional layers utilizing ESP-NN vector extensions.
            </span>
          </div>

          <div className={styles.pipelineStep}>
            <span className={styles.stepNum}>STEP 04</span>
            <span className={styles.stepTitle}>Threshold Check</span>
            <span className={styles.stepDetail}>
              If softmax probability &ge; 0.82, an alert interrupt fires to awaken the LoRa transceiver.
            </span>
          </div>

          <div className={styles.pipelineStep}>
            <span className={styles.stepNum}>STEP 05</span>
            <span className={styles.stepTitle}>16-Byte LoRa Broadcast</span>
            <span className={styles.stepDetail}>
              Transmits binary packet at 865.2 MHz (SF9) with battery, SPL, and threat metadata.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
