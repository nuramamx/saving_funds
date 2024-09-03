import { ZodIssue } from "zod";

export default function IssueTransform(key: string, issues: ZodIssue[]) {
  const customizedIssues = issues.map((issue: ZodIssue) => ({
    ...issue,
    path: [key, ...issue.path],
  }));

  return customizedIssues;
}