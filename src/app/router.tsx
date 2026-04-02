import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  LazyDeliveryInsightsPage,
  LazyEmployeeReviewDetailPage,
  LazyEngineeringSummaryPage,
  LazyMetricDictionaryPage,
  LazyPeopleGrowthSummaryPage,
} from '@/app/lazy-pages'
import { LazyRoute } from '@/shared/components/route-loading'
import { AppShell } from '@/shared/layout/app-shell'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/summary" />,
      },
      {
        path: 'summary',
        element: (
          <LazyRoute>
            <LazyEngineeringSummaryPage />
          </LazyRoute>
        ),
      },
      {
        path: 'delivery-insights',
        element: (
          <LazyRoute>
            <LazyDeliveryInsightsPage />
          </LazyRoute>
        ),
      },
      {
        path: 'people-growth',
        element: (
          <LazyRoute>
            <LazyPeopleGrowthSummaryPage />
          </LazyRoute>
        ),
      },
      {
        path: 'people-growth/employees/:employeeId',
        element: (
          <LazyRoute>
            <LazyEmployeeReviewDetailPage />
          </LazyRoute>
        ),
      },
      {
        path: 'metric-dictionary',
        element: (
          <LazyRoute>
            <LazyMetricDictionaryPage />
          </LazyRoute>
        ),
      },
    ],
  },
])