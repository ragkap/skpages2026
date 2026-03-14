interface AvatarProps {
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  size?: number;
}

export default function Avatar({ initials, gradientFrom, gradientTo, size = 16 }: AvatarProps) {
  return (
    <div
      className="author-avatar"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        width: size,
        height: size,
        fontSize: size < 20 ? 7 : 10,
      }}
    >
      {initials}
    </div>
  );
}
