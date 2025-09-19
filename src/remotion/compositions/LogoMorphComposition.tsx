import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LogoMorphSequence } from "../sequences/LogoMorphSequence";

interface LogoMorphProps {
  logoUrl: string;
  brandColors: string[];
}

export const LogoMorphComposition: React.FC<LogoMorphProps> = ({
  logoUrl,
  brandColors,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 to-purple-900">
      <LogoMorphSequence
        logoUrl={logoUrl}
        startFrame={0}
        currentFrame={frame}
        brandColors={brandColors}
      />
    </AbsoluteFill>
  );
};