import React from 'react';
import { VideoCreationStudio } from '@/components/VideoCreationStudio';
import { TechVideoComposition } from '@/remotion/compositions/TechVideoComposition';

const Index = () => {
  return (
    <VideoCreationStudio composition={TechVideoComposition} />
  );
};

export default Index;