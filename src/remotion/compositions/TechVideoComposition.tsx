import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CodeRevealSequence } from "../sequences/CodeRevealSequence";
import { LogoMorphSequence } from "../sequences/LogoMorphSequence";
import { KineticTypographySequence } from "../sequences/KineticTypographySequence";
import { GeometricBackgroundSequence } from "../sequences/GeometricBackgroundSequence";

interface TechVideoProps {
  title: string;
  subtitle: string;
  codeSnippet: string;
  logoUrl: string;
}

export const TechVideoComposition: React.FC<TechVideoProps> = ({
  title,
  subtitle,
  codeSnippet,
  logoUrl,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const backgroundOpacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div style={{ opacity: backgroundOpacity }}>
        <GeometricBackgroundSequence 
          startFrame={0}
          durationInFrames={durationInFrames}
        />
      </div>

      {/* Logo sequence - frames 0-120 */}
      {frame >= 0 && frame < 120 && (
        <LogoMorphSequence
          logoUrl={logoUrl}
          startFrame={0}
          currentFrame={frame}
          brandColors={["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"]}
        />
      )}

      {/* Typography sequence - frames 90-240 */}
      {frame >= 90 && frame < 240 && (
        <KineticTypographySequence
          text={title}
          subtitle={subtitle}
          startFrame={90}
          currentFrame={frame}
          accentColor="#6366f1"
        />
      )}

      {/* Code reveal sequence - frames 210-450 */}
      {frame >= 210 && frame < 450 && (
        <CodeRevealSequence
          code={codeSnippet}
          startFrame={210}
          currentFrame={frame}
          language="javascript"
          theme="dark"
        />
      )}

      {/* Final logo transition - frames 420-600 */}
      {frame >= 420 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              opacity: interpolate(frame, [420, 450], [0, 1], { extrapolateLeft: "clamp" }),
              transform: `scale(${interpolate(frame, [420, 480], [0.8, 1], { extrapolateLeft: "clamp" })})`,
            }}
            className="text-6xl font-bold text-white"
          >
            {title}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};