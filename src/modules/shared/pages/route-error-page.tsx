import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

import { StatusPage } from '@/shared/components/status-page'
import { Button } from '@/shared/ui/button'

function getRouteErrorState(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return {
      code: String(error.status),
      title: error.status === 404 ? 'Route not found' : 'Application route error',
      description: typeof error.data === 'string'
        ? error.data
        : error.statusText || 'The requested route could not be rendered.',
    }
  }

  if (error instanceof Error) {
    return {
      code: 'Error',
      title: 'Unexpected application error',
      description: error.message || 'The page failed to render because of an unexpected application error.',
    }
  }

  return {
    code: 'Error',
    title: 'Unexpected application error',
    description: 'The page failed to render because of an unexpected application error.',
  }
}

export function RouteErrorPage() {
  const routeError = useRouteError()
  const errorState = getRouteErrorState(routeError)

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
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload page
          </Button>
        </>
      )}
      code={errorState.code}
      description={errorState.description}
      details={[
        {
          label: 'What happened',
          value: 'A route failed to resolve or a page threw an error while rendering.',
        },
        {
          label: 'What to do',
          value: 'Return to a stable module, then retry the workflow from the main navigation.',
        },
        {
          label: 'Available modules',
          value: 'Engineering Summary, Delivery Insights, People Growth, and Metric Dictionary.',
        },
      ]}
      fullScreen
      icon={AlertTriangle}
      title={errorState.title}
    />
  )
}