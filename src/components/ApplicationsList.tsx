import type { JobApplication } from "@prisma/client";
import { ConfirmButton } from "./ConfirmButton";

type ApplicationsProps = {
  applications: JobApplication[];
  deleteApplication: (id: string) => void;
};
// applications list / cards
export const ApplicationsList = ({
  applications,
  deleteApplication,
}: ApplicationsProps) => {
  if (applications.length === 0) {
    return <p>No applications found</p>;
  }

  const filteredApplications = applications.filter(
    (application) => !application.deleted,
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {filteredApplications?.map((application) => (
        <div key={application.id} className="card shadow-lg">
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
            <ConfirmButton
              buttonText="Delete"
              className="btn btn-primary"
              confirmClass="btn btn-warning"
              onClick={() => deleteApplication(application.id)}
            >
              Confirm Delete
            </ConfirmButton>
          </div>
        </div>
      ))}
    </div>
  );
};
