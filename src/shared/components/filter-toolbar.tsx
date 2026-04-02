import { filterOptions, type FilterKey, usePlatformStore } from '@/app/store/use-platform-store'

interface FilterToolbarProps {
  keys: FilterKey[]
}

function labelize(value: string) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
}

export function FilterToolbar({ keys }: FilterToolbarProps) {
  const filters = usePlatformStore((state) => state.filters)
  const setFilter = usePlatformStore((state) => state.setFilter)

  return (
    <div className="rounded-[1rem] border border-border/70 bg-muted/40 p-3.5 shadow-panel">
      <div className="flex flex-wrap items-center gap-3">
        <span className="px-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Filters
        </span>
        {keys.map((key) => (
          <label className="flex min-w-[148px] flex-col gap-2 text-sm" key={key}>
            <select
              aria-label={labelize(key)}
              className="h-10 rounded-lg border border-border/80 bg-card px-3 text-sm text-foreground outline-none transition focus:border-primary"
              value={filters[key]}
              onChange={(event) => setFilter(key, event.target.value)}
            >
              <option value={filters[key]} disabled hidden>
                {labelize(key)}
              </option>
              {filterOptions[key].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  )
}