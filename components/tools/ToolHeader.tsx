type ToolHeaderProps = {
  title: string;
  description: string;
};

export default function ToolHeader({
  title,
  description,
}: ToolHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-bold">
        {title}
      </h1>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>
    </div>
  );
}