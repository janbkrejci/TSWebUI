export default function Home() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TS Web UI (Shadcn Edition)</h1>
        <p className="text-muted-foreground mt-2">
          A React/Shadcn implementation of the original TS Web UI custom components.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Cards will go here later */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Window</span>
                <span className="text-sm text-muted-foreground">Draggable, resizable windows</span>
            </div>
        </div>
         <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Table</span>
                <span className="text-sm text-muted-foreground">Advanced data tables</span>
            </div>
        </div>
         <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-col items-center justify-center space-y-2 h-40">
                <span className="font-semibold text-lg">TS Form</span>
                <span className="text-sm text-muted-foreground">JSON-driven forms</span>
            </div>
        </div>
      </div>
    </div>
  );
}