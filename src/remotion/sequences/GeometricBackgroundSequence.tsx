import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface GeometricBackgroundSequenceProps {
  startFrame: number;
  durationInFrames: number;
  complexity?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export const GeometricBackgroundSequence: React.FC<GeometricBackgroundSequenceProps> = ({
  startFrame,
  durationInFrames,
  complexity = 6,
  primaryColor = "#6366f1",
  secondaryColor = "#8b5cf6",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const shapes = Array.from({ length: complexity }, (_, i) => ({
    id: i,
    size: 50 + (i % 3) * 30,
    initialX: (i % 4) * 25,
    initialY: (Math.floor(i / 4) % 3) * 33,
    rotationSpeed: 0.5 + (i % 3) * 0.3,
    scaleSpeed: 0.8 + (i % 2) * 0.4,
    type: i % 3, // 0: circle, 1: square, 2: triangle
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape) => {
        const shapeDelay = shape.id * 15;
        
        const opacity = interpolate(
          localFrame,
          [shapeDelay, shapeDelay + 30, durationInFrames - 60, durationInFrames],
          [0, 0.4, 0.4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const rotation = interpolate(
          localFrame,
          [shapeDelay, durationInFrames],
          [0, 360 * shape.rotationSpeed],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = interpolate(
          localFrame,
          [shapeDelay, shapeDelay + 60, durationInFrames - 60, durationInFrames],
          [0.3, 1, 1, 0.3],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const x = interpolate(
          localFrame,
          [shapeDelay, durationInFrames],
          [shape.initialX, shape.initialX + 20],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const y = interpolate(
          localFrame,
          [shapeDelay, durationInFrames],
          [shape.initialY, shape.initialY - 10],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Mathematical precision for smooth interpolation
        const pulseScale = 1 + Math.sin(localFrame * 0.1 + shape.id) * 0.1;
        const colorPhase = Math.sin(localFrame * 0.05 + shape.id * 0.5);
        const shapeColor = colorPhase > 0 ? primaryColor : secondaryColor;

        const shapeStyle = {
          position: 'absolute' as const,
          left: `${x}%`,
          top: `${y}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          opacity,
          transform: `
            translate(-50%, -50%) 
            rotate(${rotation}deg) 
            scale(${scale * pulseScale})
          `,
          background: shape.type === 0 
            ? `radial-gradient(circle, ${shapeColor}40, transparent)`
            : `linear-gradient(45deg, ${shapeColor}40, ${shapeColor}20)`,
          border: `1px solid ${shapeColor}80`,
        };

        const ShapeComponent = () => {
          switch (shape.type) {
            case 0: // Circle
              return (
                <div
                  style={{
                    ...shapeStyle,
                    borderRadius: '50%',
                    boxShadow: `0 0 20px ${shapeColor}40`
                  }}
                />
              );
            case 1: // Square
              return (
                <div
                  style={{
                    ...shapeStyle,
                    borderRadius: '8px',
                    boxShadow: `0 0 15px ${shapeColor}30`
                  }}
                />
              );
            case 2: // Triangle
              return (
                <div
                  style={{
                    ...shapeStyle,
                    width: 0,
                    height: 0,
                    borderLeft: `${shape.size / 2}px solid transparent`,
                    borderRight: `${shape.size / 2}px solid transparent`,
                    borderBottom: `${shape.size}px solid ${shapeColor}60`,
                    background: 'transparent',
                    filter: `drop-shadow(0 0 10px ${shapeColor}40)`
                  }}
                />
              );
            default:
              return null;
          }
        };

        return <ShapeComponent key={shape.id} />;
      })}

      {/* Grid overlay for mathematical precision */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`grid-v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${i * 10}%`,
              background: `linear-gradient(to bottom, transparent, ${primaryColor}20, transparent)`,
              opacity: interpolate(
                localFrame,
                [0, 60, durationInFrames - 60, durationInFrames],
                [0, 0.1, 0.1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            }}
          />
        ))}
        
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`grid-h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 16.67}%`,
              background: `linear-gradient(to right, transparent, ${secondaryColor}20, transparent)`,
              opacity: interpolate(
                localFrame,
                [0, 60, durationInFrames - 60, durationInFrames],
                [0, 0.1, 0.1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            }}
          />
        ))}
      </div>
    </div>
  );
};