import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface CodeRevealSequenceProps {
  code: string;
  startFrame: number;
  currentFrame: number;
  language: string;
  theme: string;
}

export const CodeRevealSequence: React.FC<CodeRevealSequenceProps> = ({
  code,
  startFrame,
  currentFrame,
  language,
  theme,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const lines = code.split('\n');
  const totalLines = lines.length;
  const revealDuration = 120; // 2 seconds at 60fps

  const containerOpacity = interpolate(
    localFrame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const containerScale = interpolate(
    localFrame,
    [0, 30],
    [0.9, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center p-16"
      style={{
        opacity: containerOpacity,
        transform: `scale(${containerScale})`
      }}
    >
      <div className="max-w-4xl w-full">
        {/* Code editor header */}
        <div className="bg-gray-800 rounded-t-lg p-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-sm font-mono">
            animation.{language}
          </span>
        </div>

        {/* Code content */}
        <div className="bg-gray-900 rounded-b-lg p-6 font-mono text-sm">
          {lines.map((line, index) => {
            const lineRevealFrame = (index / totalLines) * revealDuration;
            const lineOpacity = interpolate(
              localFrame,
              [lineRevealFrame + 20, lineRevealFrame + 40],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const lineTransform = interpolate(
              localFrame,
              [lineRevealFrame + 20, lineRevealFrame + 40],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Simple syntax highlighting
            const highlightedLine = line
              .replace(/(function|const|let|var|return|if|else|for|while)/g, '<span style="color: #c792ea;">$1</span>')
              .replace(/('.*?'|".*?")/g, '<span style="color: #c3e88d;">$1</span>')
              .replace(/(\d+)/g, '<span style="color: #f78c6c;">$1</span>')
              .replace(/(\/\/.*)/g, '<span style="color: #676e95;">$1</span>');

            return (
              <div
                key={index}
                style={{
                  opacity: lineOpacity,
                  transform: `translateX(${lineTransform}px)`,
                  transitionDelay: `${index * 50}ms`
                }}
                className="flex items-center py-1"
              >
                <span className="text-gray-500 w-8 text-right mr-4 select-none">
                  {index + 1}
                </span>
                <span 
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: highlightedLine }}
                />
                {/* Typewriter cursor */}
                {localFrame > lineRevealFrame + 20 && localFrame < lineRevealFrame + 45 && (
                  <span className="animate-pulse text-white ml-1">|</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => {
            const particleDelay = i * 30;
            const particleOpacity = interpolate(
              localFrame,
              [particleDelay, particleDelay + 60, particleDelay + 120],
              [0, 0.3, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const particleY = interpolate(
              localFrame,
              [particleDelay, particleDelay + 120],
              [100, -20],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  opacity: particleOpacity,
                  left: `${20 + i * 15}%`,
                  top: `${particleY}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};