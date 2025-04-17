import { notFound } from 'next/navigation';

interface GamePageProps {
  params: {
    mode: string;
  };
}

const validModes = ['classic', 'challenge', 'zen'];

export default function GamePage({ params }: GamePageProps) {
  const { mode } = params;

  if (!validModes.includes(mode)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center capitalize">
          {mode} Mode
        </h1>
        {/* Game component will be rendered here */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <p className="text-center text-xl">
            {mode === 'classic' && 'Wait for the green light and click as fast as you can!'}
            {mode === 'challenge' && 'Get ready for unpredictable timing and patterns!'}
            {mode === 'zen' && 'Focus on consistent timing and perfect your reaction time.'}
          </p>
        </div>
      </div>
    </div>
  );
} 