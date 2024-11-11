import type { JobApplicationWithStatus } from "../components/ApplicationsList";

export type Filter =
  | (typeof groupFilters)[number]
  | (typeof applicationStatuses)[number];

export const unsuccessfulStatuses = ["Rejected", "Ghosted"] as const;
export const idleStatuses = ["Applied", "Easy Apply", "Viewed"] as const;
export const activeStatuses = [
  "HR Phone Screen",
  "HR Interview",
  "Technical Interview",
  "Final Interview",
] as const;
export const successStatuses = ["Offer"] as const;
export const applicationStatuses = [
  ...unsuccessfulStatuses,
  ...idleStatuses,
  ...activeStatuses,
  ...successStatuses,
] as const;

export const groupFilters = [
  "All",
  "Unsuccessful",
  "Idle",
  "Active",
  "Success",
] as const;

export const groupFilterApplications = (
  application: JobApplicationWithStatus,
  filter: Filter,
) => {
  const lastStatus =
    application.statuses[application.statuses.length - 1]?.status;
  switch (filter) {
    case "Unsuccessful":
      return unsuccessfulStatuses.includes(
        lastStatus as (typeof unsuccessfulStatuses)[number],
      );
    case "Idle":
      return idleStatuses.includes(lastStatus as (typeof idleStatuses)[number]);
    case "Active":
      return activeStatuses.includes(
        lastStatus as (typeof activeStatuses)[number],
      );
    case "Success":
      return successStatuses.includes(
        lastStatus as (typeof successStatuses)[number],
      );
    default:
      return true;
  }
};

const matchFilter = (application: JobApplicationWithStatus, filter: Filter) => {
  const lastStatus =
    application.statuses[application.statuses.length - 1]?.status;
  return lastStatus === filter;
};

export const filterApplications =  (applications: JobApplicationWithStatus[], filter: Filter) => {
  if (filter === "All") {
    return applications;
  }
  if (applicationStatuses.includes(filter as typeof applicationStatuses[number])) {
    return applications.filter((application) => matchFilter(application, filter));
  }
  return applications.filter((application) => groupFilterApplications(application, filter));
}