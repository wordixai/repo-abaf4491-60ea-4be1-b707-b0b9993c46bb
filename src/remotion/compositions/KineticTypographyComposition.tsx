import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticTypographySequence } from "../sequences/KineticTypographySequence";

interface KineticTypographyProps {
  text: string;
  accentColor: string;
}

export const KineticTypographyComposition: React.FC<KineticTypographyProps> = ({
  text,
  accentColor,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <KineticTypographySequence
        text={text}
        subtitle="Advanced Animation Framework"
        startFrame={0}
        currentFrame={frame}
        accentColor={accentColor}
      />
    </AbsoluteFill>
  );
};