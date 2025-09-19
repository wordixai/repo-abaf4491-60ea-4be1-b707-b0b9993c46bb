import { Composition } from "remotion";
import { TechVideoComposition } from "./compositions/TechVideoComposition";
import { CodeRevealComposition } from "./compositions/CodeRevealComposition";
import { LogoMorphComposition } from "./compositions/LogoMorphComposition";
import { KineticTypographyComposition } from "./compositions/KineticTypographyComposition";
import { GeometricShapesComposition } from "./compositions/GeometricShapesComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TechVideo"
        component={TechVideoComposition}
        durationInFrames={600}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Dynamic Tech Showcase",
          subtitle: "Advanced Animation Sequences",
          codeSnippet: `const animate = (element) => {
  return element
    .transition({ duration: 2 })
    .scale(1.2)
    .rotate(360);
};`,
          logoUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=200&h=200&fit=crop&crop=center",
        }}
      />
      
      <Composition
        id="CodeReveal"
        component={CodeRevealComposition}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          code: `function createAnimation() {
  const timeline = gsap.timeline();
  
  timeline
    .from('.title', { y: -100, opacity: 0 })
    .from('.content', { x: -50, opacity: 0 })
    .to('.background', { scale: 1.1 });
    
  return timeline;
}`,
          language: "javascript",
          theme: "dark"
        }}
      />

      <Composition
        id="LogoMorph"
        component={LogoMorphComposition}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          logoUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=200&h=200&fit=crop&crop=center",
          brandColors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"]
        }}
      />

      <Composition
        id="KineticTypography"
        component={KineticTypographyComposition}
        durationInFrames={360}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          text: "INNOVATIVE TECHNOLOGY SOLUTIONS",
          accentColor: "#6366f1"
        }}
      />

      <Composition
        id="GeometricShapes"
        component={GeometricShapesComposition}
        durationInFrames={480}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          complexity: 8,
          primaryColor: "#6366f1",
          secondaryColor: "#8b5cf6"
        }}
      />
    </>
  );
};