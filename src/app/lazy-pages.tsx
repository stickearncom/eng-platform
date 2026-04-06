import { lazy } from 'react'

const loadEngineeringSummaryPage = () =>
  import('@/modules/engineering-summary/pages/engineering-summary-page').then((module) => ({
    default: module.EngineeringSummaryPage,
  }))

const loadDeliveryInsightsPage = () =>
  import('@/modules/delivery-insights/pages/delivery-insights-page').then((module) => ({
    default: module.DeliveryInsightsPage,
  }))

const loadPeopleGrowthSummaryPage = () =>
  import('@/modules/people-growth/pages/people-growth-summary-page').then((module) => ({
    default: module.PeopleGrowthSummaryPage,
  }))

const loadEmployeeReviewDetailPage = () =>
  import('@/modules/people-growth/pages/employee-review-detail-page').then((module) => ({
    default: module.EmployeeReviewDetailPage,
  }))

const loadMetricDictionaryPage = () =>
  import('@/modules/shared/pages/metric-dictionary-page').then((module) => ({
    default: module.MetricDictionaryPage,
  }))

const loadReviewFormsPage = () =>
  import('@/modules/review-forms/pages/review-forms-page').then((module) => ({
    default: module.ReviewFormsPage,
  }))

const loadNotFoundPage = () =>
  import('@/modules/shared/pages/not-found-page').then((module) => ({
    default: module.NotFoundPage,
  }))

export const LazyEngineeringSummaryPage = lazy(loadEngineeringSummaryPage)
export const LazyDeliveryInsightsPage = lazy(loadDeliveryInsightsPage)
export const LazyPeopleGrowthSummaryPage = lazy(loadPeopleGrowthSummaryPage)
export const LazyEmployeeReviewDetailPage = lazy(loadEmployeeReviewDetailPage)
export const LazyMetricDictionaryPage = lazy(loadMetricDictionaryPage)
export const LazyReviewFormsPage = lazy(loadReviewFormsPage)
export const LazyNotFoundPage = lazy(loadNotFoundPage)