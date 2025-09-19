import { AbsoluteFill } from "remotion";
import { CodeRevealSequence } from "../sequences/CodeRevealSequence";

interface CodeRevealProps {
  code: string;
  language: string;
  theme: string;
}

export const CodeRevealComposition: React.FC<CodeRevealProps> = ({
  code,
  language,
  theme,
}) => {
  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-black">
      <CodeRevealSequence
        code={code}
        startFrame={0}
        currentFrame={0}
        language={language}
        theme={theme}
      />
    </AbsoluteFill>
  );
};