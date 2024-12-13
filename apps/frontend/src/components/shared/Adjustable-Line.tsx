interface AdjustableLineProps {
  color?: string; // Cor da linha (opcional)
  thickness?: string; // Espessura da linha (opcional)
  margin?: string; // Margem vertical (opcional)
}

const AdjustableLine: React.FC<AdjustableLineProps> = ({
  color = "bg-purple-800",
  thickness = "h-[1px]",
  margin = "my-2",
}) => {
  return <div className={`w-full ${thickness} ${color} ${margin}`} />;
};

export default AdjustableLine;
