import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Download, Settings, Code, Type, Shapes, Image } from 'lucide-react';

interface VideoCreationStudioProps {
  composition: any;
}

export const VideoCreationStudio: React.FC<VideoCreationStudioProps> = ({ composition }) => {
  const [selectedComposition, setSelectedComposition] = useState('TechVideo');
  const [compositionProps, setCompositionProps] = useState({
    title: "Dynamic Tech Showcase",
    subtitle: "Advanced Animation Sequences",
    codeSnippet: `const animate = (element) => {
  return element
    .transition({ duration: 2 })
    .scale(1.2)
    .rotate(360);
};`,
    logoUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=200&h=200&fit=crop&crop=center",
    brandColors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"],
    accentColor: "#6366f1",
    language: "javascript",
    theme: "dark"
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const compositions = [
    { id: 'TechVideo', name: 'Tech Video', icon: Play, duration: 600 },
    { id: 'CodeReveal', name: 'Code Reveal', icon: Code, duration: 300 },
    { id: 'LogoMorph', name: 'Logo Animation', icon: Image, duration: 240 },
    { id: 'KineticTypography', name: 'Typography', icon: Type, duration: 360 },
    { id: 'GeometricShapes', name: 'Geometric Shapes', icon: Shapes, duration: 480 },
  ];

  const handleExport = () => {
    console.log('Exporting video with props:', compositionProps);
    // In a real implementation, this would trigger the video export process
  };

  const updateProp = (key: string, value: any) => {
    setCompositionProps(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Video Creation Studio
          </h1>
          <p className="text-gray-300 text-lg">Create dynamic videos with advanced animation sequences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Preview
                  <Badge variant="secondary" className="ml-auto">
                    {compositions.find(c => c.id === selectedComposition)?.duration || 0} frames
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {composition && (
                    <Player
                      component={composition}
                      durationInFrames={compositions.find(c => c.id === selectedComposition)?.duration || 600}
                      compositionWidth={1920}
                      compositionHeight={1080}
                      fps={60}
                      controls
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      inputProps={compositionProps}
                    />
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button 
                    onClick={handleExport}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Composition Selection */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Composition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {compositions.map((comp) => {
                    const IconComponent = comp.icon;
                    return (
                      <Button
                        key={comp.id}
                        variant={selectedComposition === comp.id ? "default" : "outline"}
                        className={`justify-start ${
                          selectedComposition === comp.id 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "border-gray-600 text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedComposition(comp.id)}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {comp.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Properties Panel */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                    <TabsTrigger value="text" className="text-gray-300">Text</TabsTrigger>
                    <TabsTrigger value="code" className="text-gray-300">Code</TabsTrigger>
                    <TabsTrigger value="style" className="text-gray-300">Style</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-gray-300">Title</Label>
                      <Input
                        id="title"
                        value={compositionProps.title}
                        onChange={(e) => updateProp('title', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle" className="text-gray-300">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={compositionProps.subtitle}
                        onChange={(e) => updateProp('subtitle', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="space-y-4">
                    <div>
                      <Label htmlFor="language" className="text-gray-300">Language</Label>
                      <Select 
                        value={compositionProps.language} 
                        onValueChange={(value) => updateProp('language', value)}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="css">CSS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="code" className="text-gray-300">Code Snippet</Label>
                      <Textarea
                        id="code"
                        value={compositionProps.codeSnippet}
                        onChange={(e) => updateProp('codeSnippet', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1 font-mono text-sm"
                        rows={8}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="style" className="space-y-4">
                    <div>
                      <Label htmlFor="accentColor" className="text-gray-300">Accent Color</Label>
                      <Input
                        id="accentColor"
                        type="color"
                        value={compositionProps.accentColor}
                        onChange={(e) => updateProp('accentColor', e.target.value)}
                        className="bg-gray-700 border-gray-600 h-10 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="logoUrl" className="text-gray-300">Logo URL</Label>
                      <Input
                        id="logoUrl"
                        value={compositionProps.logoUrl}
                        onChange={(e) => updateProp('logoUrl', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                        placeholder="https://..."
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};