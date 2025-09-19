import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface KineticTypographySequenceProps {
  text: string;
  subtitle: string;
  startFrame: number;
  currentFrame: number;
  accentColor: string;
}

export const KineticTypographySequence: React.FC<KineticTypographySequenceProps> = ({
  text,
  subtitle,
  startFrame,
  currentFrame,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const words = text.split(' ');
  const titleRevealDuration = 90;
  const subtitleDelay = 60;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      {/* Main title */}
      <div className="mb-8">
        {words.map((word, wordIndex) => {
          const wordDelay = wordIndex * 8;
          const letters = word.split('');

          return (
            <span key={wordIndex} className="inline-block mr-6">
              {letters.map((letter, letterIndex) => {
                const letterDelay = wordDelay + letterIndex * 2;
                
                const letterOpacity = interpolate(
                  localFrame,
                  [letterDelay, letterDelay + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const letterY = interpolate(
                  localFrame,
                  [letterDelay, letterDelay + 20],
                  [50, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const letterRotation = interpolate(
                  localFrame,
                  [letterDelay, letterDelay + 30],
                  [15, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const letterScale = interpolate(
                  localFrame,
                  [letterDelay, letterDelay + 15, letterDelay + 30],
                  [0.5, 1.2, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                // Color cycling effect
                const colorPhase = interpolate(
                  localFrame,
                  [letterDelay + 30, letterDelay + 90],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                const letterColor = colorPhase > 0.5 ? accentColor : '#ffffff';

                return (
                  <span
                    key={letterIndex}
                    className="inline-block text-6xl font-bold"
                    style={{
                      opacity: letterOpacity,
                      transform: `
                        translateY(${letterY}px) 
                        rotate(${letterRotation}deg) 
                        scale(${letterScale})
                      `,
                      color: letterColor,
                      textShadow: `0 0 20px ${letterColor}`,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: interpolate(
            localFrame,
            [subtitleDelay, subtitleDelay + 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
          transform: `translateY(${interpolate(
            localFrame,
            [subtitleDelay, subtitleDelay + 30],
            [30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}px)`
        }}
        className="text-2xl text-gray-300 font-light tracking-wider"
      >
        {subtitle.split('').map((char, index) => {
          const charDelay = subtitleDelay + index * 3;
          const charOpacity = interpolate(
            localFrame,
            [charDelay, charDelay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <span
              key={index}
              style={{ opacity: charOpacity }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      {/* Animated underline */}
      <div
        className="mt-8"
        style={{
          width: interpolate(
            localFrame,
            [titleRevealDuration + 20, titleRevealDuration + 60],
            [0, 400],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          opacity: interpolate(
            localFrame,
            [titleRevealDuration + 20, titleRevealDuration + 40],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, index) => {
        const particleDelay = 30 + index * 10;
        const particleOpacity = interpolate(
          localFrame,
          [particleDelay, particleDelay + 60, particleDelay + 120],
          [0, 0.8, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const particleX = interpolate(
          localFrame,
          [particleDelay, particleDelay + 120],
          [-100, 100],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const particleY = interpolate(
          localFrame,
          [particleDelay, particleDelay + 120],
          [0, -80],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={index}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: accentColor,
              opacity: particleOpacity,
              left: `${50 + (index % 4 - 2) * 15}%`,
              top: `${60 + Math.floor(index / 4) * 10}%`,
              transform: `translate(${particleX}px, ${particleY}px)`,
              boxShadow: `0 0 10px ${accentColor}`
            }}
          />
        );
      })}
    </div>
  );
};