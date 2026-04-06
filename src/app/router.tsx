import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  LazyDeliveryInsightsPage,
  LazyEmployeeReviewDetailPage,
  LazyEngineeringSummaryPage,
  LazyMetricDictionaryPage,
  LazyNotFoundPage,
  LazyPeopleGrowthSummaryPage,
  LazyReviewFormsPage,
} from '@/app/lazy-pages'
import { RouteErrorPage } from '@/modules/shared/pages/route-error-page'
import { LazyRoute } from '@/shared/components/route-loading'
import { AppShell } from '@/shared/layout/app-shell'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
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
      {
        path: 'review-forms',
        element: (
          <LazyRoute>
            <LazyReviewFormsPage />
          </LazyRoute>
        ),
      },
      {
        path: 'review-forms/:reviewMode',
        element: (
          <LazyRoute>
            <LazyReviewFormsPage />
          </LazyRoute>
        ),
      },
      {
        path: '*',
        element: (
          <LazyRoute>
            <LazyNotFoundPage />
          </LazyRoute>
        ),
      },
    ],
  },
])