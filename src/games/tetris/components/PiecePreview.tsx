import type { Piece } from '../core/pieces';

interface PiecePreviewProps {
  piece?: Piece;
  label: string;
}

export default function PiecePreview({ piece, label }: PiecePreviewProps) {
  if (!piece) {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">{label}</div>
        <div className="aspect-square bg-gray-900 rounded-md" />
      </div>
    );
  }

  const size = piece.shape.length;
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div 
        className="grid gap-[1px] bg-gray-900 rounded-md p-2"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          aspectRatio: '1'
        }}
      >
        {piece.shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square relative
                ${cell ? `
                  ${piece.color}
                  border-t-2 border-r-2 border-white/20
                  after:absolute after:inset-0 
                  after:border-b-2 after:border-l-2 after:border-black/30
                ` : 'bg-transparent'}
              `}
            />
          ))
        )}
      </div>
    </div>
  );
} 