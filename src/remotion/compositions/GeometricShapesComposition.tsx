import { AbsoluteFill } from "remotion";
import { GeometricBackgroundSequence } from "../sequences/GeometricBackgroundSequence";

interface GeometricShapesProps {
  complexity: number;
  primaryColor: string;
  secondaryColor: string;
}

export const GeometricShapesComposition: React.FC<GeometricShapesProps> = ({
  complexity,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-black">
      <GeometricBackgroundSequence
        startFrame={0}
        durationInFrames={480}
        complexity={complexity}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </AbsoluteFill>
  );
};