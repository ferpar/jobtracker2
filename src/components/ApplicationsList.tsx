import type { JobApplication, JobApplicationStatus } from "@prisma/client";
import { ConfirmButton } from "./ConfirmButton";
import { ClosingX } from "./Icons";

type JobApplicationWithStatus = JobApplication & {
  statuses: JobApplicationStatus[];
};

type ApplicationsProps = {
  applications: JobApplicationWithStatus[];
  deleteApplication: (id: string) => void;
  loadingApplications?: boolean;
};
// applications list / cards
export const ApplicationsList = ({
  applications,
  deleteApplication,
  loadingApplications,
}: ApplicationsProps) => {
  if (applications.length === 0) {
    return <p>No applications found</p>;
  }

  const filteredApplications = applications.filter(
    (application) => !application.deleted,
  );

  return (
    <div className="relative mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
      {filteredApplications?.map((application) => (
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
            <p><strong>Status:</strong>{" "}
            {application?.statuses[0]?.status ?? "No status"}
            </p>
            <ConfirmButton
              buttonText={<ClosingX />}
              className="btn btn-circle absolute end-2 top-2"
              confirmClass="btn btn-circle btn-error absolute end-2 top-2"
              onClick={() => deleteApplication(application.id)}
            >
              <ClosingX />
            </ConfirmButton>
          </div>
        </div>
      ))}
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
