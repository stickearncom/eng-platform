import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

import { StatusPage } from '@/shared/components/status-page'
import { Button } from '@/shared/ui/button'

export function NotFoundPage() {
  return (
    <StatusPage
      actions={(
        <>
          <Button asChild>
            <Link to="/summary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Engineering Summary
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/metric-dictionary">Open Metric Dictionary</Link>
          </Button>
        </>
      )}
      code="404 Error"
      description="The page you requested does not exist, may have been moved, or is not available in this prototype route set."
      details={[
        {
          label: 'Try this',
          value: 'Return to the main engineering summary and navigate again from the primary modules.',
        },
        {
          label: 'Common cause',
          value: 'This usually happens when a route path is typed manually or a prototype link points to a screen that has not been implemented yet.',
        },
        {
          label: 'Available modules',
          value: 'Engineering Summary, Delivery Insights, People Growth, Review Forms, and Metric Dictionary.',
        },
      ]}
      icon={Compass}
      title="Page not found"
    />
  )
}