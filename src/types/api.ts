// Subject and Unit types
export interface Subject {
  id: string
  name: string
}

export interface Unit {
  id: string
  name: string
}

// Problem metadata types
export interface ProblemMetadata {
  title: string
  subject_id: string
  unit_id: string
  difficulty?: string
  tags?: string[]
  timeout_sec?: number
  memory_mb?: number
  hints?: string[]
}

// Problem types
export interface Problem {
  metadata: ProblemMetadata
  prompt: string
  starter: string
}

export interface ProblemsResponse {
  problems: Record<string, Problem>
}

// Test result types
export type TestOutcome = 'passed' | 'failed' | 'error'
export type TestVisibility = 'public' | 'hidden'

export interface TestResult {
  test_name: string
  outcome: TestOutcome
  duration: number
  message?: string
  points: number
  max_points: number
  visibility: TestVisibility
}

// Submission result types
export type SubmissionStatus =
  | 'pending'
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'timeout'
  | 'error'

export interface SubmissionResult {
  status: SubmissionStatus
  job_id?: string
  ok?: boolean
  score_total?: number
  score_max?: number
  passed?: number
  failed?: number
  errors?: number
  duration_sec?: number
  test_results?: TestResult[]
  stdout?: string
  stderr?: string
  error_message?: string
}

// Submit request types
export interface SubmitRequest {
  problem_id: string
  code: string
  student_id: string
}

export interface SubmitResponse {
  job_id: string
  status: string
}

// Admin panel types
export interface ProblemStats {
  problem_id: string
  submissions: number
  avg_score: number
}

export interface AdminSummary {
  total_submissions: number
  completed: number
  failed: number
  pending: number
  avg_score: number
  by_problem: ProblemStats[]
}

export interface Submission {
  id: number
  job_id: string
  student_id: string
  problem_id: string
  status: SubmissionStatus
  score_total: number
  score_max: number
  passed: number
  failed: number
  errors: number
  duration_sec: number
  created_at: string
}

export interface AdminSubmissionsResponse {
  submissions: Submission[]
  total: number
}

// Hierarchy types
export interface SubjectsResponse {
  subjects: Subject[]
}

export interface UnitsResponse {
  units: Unit[]
}
