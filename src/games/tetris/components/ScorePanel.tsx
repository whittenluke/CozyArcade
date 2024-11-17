interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
}

export default function ScorePanel({ score, level, lines }: ScorePanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div>
        <div className="text-sm text-gray-400">Score</div>
        <div className="text-2xl font-bold text-white">{score}</div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400">Level</div>
        <div className="text-xl font-bold text-purple-400">{level}</div>
      </div>
      
      <div>
        <div className="text-sm text-gray-400">Lines</div>
        <div className="text-xl font-bold text-purple-400">{lines}</div>
      </div>
    </div>
  );
}
