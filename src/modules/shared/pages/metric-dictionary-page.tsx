import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AudienceNotice } from '@/shared/components/audience-notice'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { findMetricDictionaryEntry, getMetricDictionaryModules, metricDictionaryEntries, metricDictionarySpotlights } from '@/shared/mocks/metric-dictionary'

export function MetricDictionaryPage() {
  const modules = getMetricDictionaryModules()
  const [searchParams] = useSearchParams()
  const moduleParam = searchParams.get('module')
  const metricParam = searchParams.get('metric')
  const focusedEntry = metricParam ? findMetricDictionaryEntry(metricParam, moduleParam && modules.includes(moduleParam as (typeof modules)[number]) ? (moduleParam as (typeof modules)[number]) : undefined) ?? findMetricDictionaryEntry(metricParam) : null
  const targetModule = focusedEntry?.module ?? (moduleParam && modules.includes(moduleParam as (typeof modules)[number]) ? (moduleParam as (typeof modules)[number]) : modules[0])
  const [activeModule, setActiveModule] = useState<(typeof modules)[number]>(targetModule)
  const visibleEntries = metricDictionaryEntries.filter((metric) => metric.module === activeModule)

  useEffect(() => {
    setActiveModule(targetModule)
  }, [targetModule])

  useEffect(() => {
    if (!focusedEntry || focusedEntry.module !== activeModule) {
      return
    }

    const cardId = `metric-card-${focusedEntry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(cardId)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeModule, focusedEntry])

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Metric Dictionary</h1>
            <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
              Shared reference layer for how engineering metrics are defined, governed, sourced, and interpreted across the platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-md px-2.5 py-1" variant="outline">Shared Core</Badge>
            <Badge className="rounded-md px-2.5 py-1" variant="outline">Governance Layer</Badge>
          </div>
        </div>
      </section>

      <PagePurposeStrip
        boundary="Use this page to verify meaning, source, formula, owner, and caveats before using any metric in a delivery, people, or leadership discussion."
        primaryAudience="All audiences that consume the platform and need one trusted reference for metric definitions and guardrails."
        purpose="Provides a shared reference layer for how engineering metrics are defined, governed, sourced, and interpreted across the platform."
      />

      <AudienceNotice
        description="Audience preview does not change this page into a different product surface. It only helps simulate how sensitive workflows behave elsewhere in the platform."
        focus="Shared metric trust and governance"
        moduleLabel="Shared Core"
        note="Metric Dictionary tetap terbuka lintas audience karena ini adalah sumber definisi bersama untuk metric, source of truth, dan interpretation guardrail."
      />

      <Card className="border-foreground/20 bg-muted/50">
        <CardContent className="p-4">
          <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Why this page exists</p>
              <p className="mt-2 text-base font-semibold leading-7 text-foreground">This page is the trust layer behind the dashboard, not a separate analytics module.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Stakeholders need one place to verify what a metric means, where it comes from, how often it refreshes, who owns it, and what caveats apply before making decisions from it.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">When teams use it</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use this page when a stakeholder asks what a metric means, how it is calculated, or whether it can be safely used for decision-making, calibration, or delivery review.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Core guardrails</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Delivery metrics are not individual performance KPIs. Low confidence means weak evidence quality. Source of truth and caveats must stay explicit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Governance Snapshot</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Quick summary of what this reference layer is governing today.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {metricDictionarySpotlights.map((item) => (
            <Card className="border-dashed border-foreground/20" key={item.title}>
              <CardHeader className="pb-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.title}</div>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-5 text-muted-foreground">{item.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Reference Modules</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Browse metric definitions by module instead of scanning a flat glossary.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-border/70 pb-2">
          {modules.map((module) => (
            <Button
              className="rounded-full"
              key={module}
              size="sm"
              type="button"
              variant={activeModule === module ? 'default' : 'outline'}
              onClick={() => setActiveModule(module)}
            >
              {module}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {visibleEntries.map((metric) => (
            <Card className={metric.name === focusedEntry?.name ? 'border-primary/50 bg-primary/5 shadow-[0_0_0_1px_rgba(15,23,42,0.06)]' : 'border-dashed border-foreground/20'} id={`metric-card-${metric.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={metric.name}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{metric.name}</CardTitle>
                    <CardDescription>{metric.module}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {metric.name === focusedEntry?.name ? <Badge variant="accent">Focused Metric</Badge> : null}
                    <Badge variant="outline">{metric.refreshCadence}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Definition</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{metric.definition}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Why It Matters</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.whyItMatters}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Formula</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{metric.formula}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Source</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{metric.source}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Owner</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{metric.owner}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Audience</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{metric.audience}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Interpretation Guardrail</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.caveat}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle className="text-sm">How to Read This Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>Use the Definition field to align language across teams.</p>
            <p>Use Source and Owner to resolve trust or refresh disputes quickly.</p>
            <p>Use Guardrail to avoid turning an operational or low-confidence metric into the wrong decision input.</p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle className="text-sm">What This Page Is Not</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>This is not a performance dashboard by itself.</p>
            <p>This is not a replacement for delivery or review workflows.</p>
            <p>This is not a place to compare teams without first reading metric caveats and scope limits.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}