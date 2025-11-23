interface FilterChipProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}

export default function FilterChip({ label, emoji, selected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg whitespace-nowrap text-sm border transition-colors ${
        selected
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
      }`}
    >
      {emoji && <span className="text-lg">{emoji}</span>}
      <span className="font-normal">{label}</span>
    </button>
  );
}
