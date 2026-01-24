import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-7xl space-y-8">
      <div className="shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">TS Web UI (Shadcn Edition)</h1>
        <p className="text-muted-foreground mt-2">
          A React/Shadcn implementation of the TS Web UI components.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <Link href="/components/ts-window" className="rounded-xl border bg-card text-card-foreground shadow block">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Window</span>
                <span className="text-sm text-muted-foreground">Draggable, resizable windows</span>
            </div>
        </Link>
        <Link href="/components/ts-table" className="rounded-xl border bg-card text-card-foreground shadow block">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Table</span>
                <span className="text-sm text-muted-foreground">Advanced data tables</span>
            </div>
        </Link>
        <Link href="/components/ts-form" className="rounded-xl border bg-card text-card-foreground shadow block">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Form</span>
                <span className="text-sm text-muted-foreground">JSON-driven forms</span>
            </div>
        </Link>
        <Link href="/components/ts-form-editor" className="rounded-xl border bg-card text-card-foreground shadow block">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Form Editor</span>
                <span className="text-sm text-muted-foreground">Form editor UI</span>
            </div>
        </Link>
      </div>
    </div>
  );
}