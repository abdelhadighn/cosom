
import { Input } from "@/components/ui/input";

interface MessageSearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function MessageSearchInput({ searchTerm, onSearchChange }: MessageSearchInputProps) {
  return (
    <Input
      type="text"
      placeholder="Rechercher dans les messages..."
      className="w-64"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
