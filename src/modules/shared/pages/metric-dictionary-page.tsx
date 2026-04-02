import { AudienceNotice } from '@/shared/components/audience-notice'
import { PageHeader } from '@/shared/components/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { metricDictionaryEntries } from '@/shared/mocks/metric-dictionary'

export function MetricDictionaryPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badge="Shared Core module"
        description="A central reference for metric semantics, formulas, and guardrails. This page keeps the platform trustworthy as more metrics are added over time."
        eyebrow="Metric Dictionary"
        title="One place to verify what every metric actually means"
      />

      <AudienceNotice moduleLabel="Shared Core" note="Metric Dictionary tetap terbuka lintas audience karena ini adalah lapisan kepercayaan bersama untuk definisi metric dan guardrail." />

      <div className="grid gap-6 md:grid-cols-3">
        {metricDictionaryEntries.map((metric) => (
          <Card key={metric.name}>
            <CardHeader>
              <CardTitle>{metric.name}</CardTitle>
              <CardDescription>{metric.module}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{metric.definition}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}