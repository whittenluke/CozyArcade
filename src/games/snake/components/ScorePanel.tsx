interface ScorePanelProps {
  score: number;
  speed: number;
  length: number;
}

export default function ScorePanel({ score, speed, length }: ScorePanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div>
        <div className="text-sm text-gray-400">Score</div>
        <div className="text-2xl font-bold text-white">{score}</div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400">Speed</div>
        <div className="text-xl font-bold text-purple-400">
          {Math.round((1000 / speed) * 10) / 10}x
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400">Length</div>
        <div className="text-xl font-bold text-purple-400">{length}</div>
      </div>
    </div>
  );
}
