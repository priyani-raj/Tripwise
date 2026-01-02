export function renderBoldText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-slate-900"
        >
          {part.replace(/\*\*/g, "")}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
