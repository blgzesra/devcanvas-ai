"use client";

type PaletteColor = {
  name: string;
  hex: string;
};

type Props = {
  colors: PaletteColor[];
};

export default function ColorPaletteResult({
  colors,
}: Props) {
  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Generated Palette
        </h2>
      </div>

      {colors.length === 0 ? (
        <div className="rounded-xl bg-[#0A0A0A] p-8 text-zinc-500">
          Your AI-generated color palette will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#0A0A0A] p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-14 rounded-lg border border-zinc-700"
                  style={{
                    backgroundColor: color.hex,
                  }}
                />

                <div>
                  <p className="font-medium">
                    {color.name}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {color.hex}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(color.hex)
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
              >
                📋 Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}