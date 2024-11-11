import type { JobApplication, JobApplicationStatus } from "@prisma/client";
import { ConfirmButton } from "./ConfirmButton";
import { ClosingX } from "./Icons";
import { type Filter, applicationStatuses, filterApplications } from "~/core/filtering";

export type JobApplicationWithStatus = JobApplication & {
  statuses: JobApplicationStatus[];
};

type ApplicationsProps = {
  applications: JobApplicationWithStatus[];
  deleteApplication: (id: string) => void;
  loadingApplications?: boolean;
  addStatus: (applicationId: string, status: string) => void;
  filter?: Filter;
};

// applications list / cards
export const ApplicationsList = ({
  applications,
  deleteApplication,
  loadingApplications,
  addStatus,
  filter = "All",
}: ApplicationsProps) => {
  if (applications.length === 0) {
    return <p>No applications found</p>;
  }

  const nonDeletedApplications = applications.filter(
    (application) => !application.deleted,
  );
  const filteredApplications = filterApplications(nonDeletedApplications, filter);

  return (
    <div className="relative mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {filteredApplications?.map((application) => {
        const lastStatus =
          application?.statuses?.length !== 0
            ? application?.statuses[application?.statuses.length - 1]?.status
            : undefined;
        return (
          <div key={application.id} className="card relative shadow-lg">
            <div className="card-body">
              <h2 className="card-title">{application.jobTitle}</h2>
              <p>
                <strong>Company:</strong> {application.companyName}
              </p>
              <p>
                <strong>Location:</strong> {application.location}
              </p>
              <p>
                <strong>Applied:</strong>{" "}
                {application.appliedDate.toISOString().split("T")[0]}
              </p>
              <p>
                <strong>Status:</strong> {lastStatus}
              </p>
              <ConfirmButton
                buttonText={<ClosingX />}
                className="btn btn-circle absolute end-2 top-2"
                confirmClass="btn btn-circle btn-error absolute end-2 top-2"
                onClick={() => deleteApplication(application.id)}
              >
                <ClosingX />
              </ConfirmButton>
              <label className="mt-4 block">
                <p>
                  <strong>Update Status:</strong>
                </p>
                <select
                  className="select select-bordered"
                  defaultValue={lastStatus}
                  onChange={(e) => addStatus(application.id, e.target.value)}
                >
                  {applicationStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        );
      })}
      {loadingApplications ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-500 opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loading loading-bars loading-lg opacity-100"></span>
          </div>
        </>
      ) : null}
    </div>
  );
};
