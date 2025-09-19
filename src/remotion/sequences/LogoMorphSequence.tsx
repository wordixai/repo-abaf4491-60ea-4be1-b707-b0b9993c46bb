import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface LogoMorphSequenceProps {
  logoUrl: string;
  startFrame: number;
  currentFrame: number;
  brandColors: string[];
}

export const LogoMorphSequence: React.FC<LogoMorphSequenceProps> = ({
  logoUrl,
  startFrame,
  currentFrame,
  brandColors,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const scale = interpolate(
    localFrame,
    [0, 30, 60, 90],
    [0, 1.2, 1, 1.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rotation = interpolate(
    localFrame,
    [0, 120],
    [0, 360],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const morphProgress = interpolate(
    localFrame,
    [30, 90],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glowIntensity = interpolate(
    Math.sin(localFrame * 0.1),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background particles */}
      {brandColors.map((color, index) => {
        const particleRotation = interpolate(
          localFrame,
          [0, 120],
          [index * 90, index * 90 + 360]
        );
        
        const particleDistance = 200 + index * 50;
        const particleOpacity = interpolate(
          localFrame,
          [0, 30, 90, 120],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: color,
              opacity: particleOpacity * 0.7,
              transform: `
                rotate(${particleRotation}deg) 
                translateX(${particleDistance}px) 
                rotate(-${particleRotation}deg)
              `,
              boxShadow: `0 0 20px ${color}`
            }}
          />
        );
      })}

      {/* Main logo container */}
      <div
        className="relative"
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
        }}
      >
        {/* Logo image */}
        <img
          src={logoUrl}
          alt="Logo"
          className="w-32 h-32 object-cover rounded-full"
          style={{
            filter: `
              brightness(${1 + morphProgress * 0.3})
              contrast(${1 + morphProgress * 0.2})
              hue-rotate(${morphProgress * 180}deg)
              drop-shadow(0 0 ${glowIntensity * 30}px ${brandColors[0]})
            `
          }}
        />

        {/* Morphing overlay shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {brandColors.map((color, index) => {
            const shapeScale = interpolate(
              localFrame,
              [30 + index * 10, 70 + index * 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const shapeRotation = interpolate(
              localFrame,
              [30 + index * 10, 120],
              [0, 180 + index * 45]
            );

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  width: '140px',
                  height: '140px',
                  border: `2px solid ${color}`,
                  borderRadius: index % 2 === 0 ? '50%' : '20%',
                  transform: `scale(${shapeScale}) rotate(${shapeRotation}deg)`,
                  opacity: morphProgress * 0.6,
                  boxShadow: `0 0 20px ${color}`
                }}
              />
            );
          })}
        </div>

        {/* Central energy core */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: morphProgress * glowIntensity
          }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${brandColors[0]}, transparent)`,
              transform: `scale(${1 + Math.sin(localFrame * 0.3) * 0.3})`,
              boxShadow: `0 0 40px ${brandColors[0]}`
            }}
          />
        </div>
      </div>

      {/* Brand color rings */}
      {brandColors.map((color, index) => {
        const ringDelay = index * 20;
        const ringScale = interpolate(
          localFrame,
          [ringDelay, ringDelay + 60],
          [0.8, 2.5],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const ringOpacity = interpolate(
          localFrame,
          [ringDelay, ringDelay + 30, ringDelay + 60],
          [0, 0.8, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={`ring-${index}`}
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              border: `1px solid ${color}`,
              borderRadius: '50%',
              transform: `scale(${ringScale}) translate(-50%, -50%)`,
              opacity: ringOpacity,
              left: '50%',
              top: '50%',
            }}
          />
        );
      })}
    </div>
  );
};