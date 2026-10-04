export default function TruncatedNotice() {
  return (
    <p className="mt-4 rounded-xl border border-yellow-700/50 bg-yellow-900/20 px-4 py-3 text-sm text-yellow-400">
      ⚠️ Output was cut off because it reached the length limit. Try a
      shorter or more specific request.
    </p>
  );
}
