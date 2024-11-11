import type { JobApplication } from "@prisma/client";
import { ConfirmButton } from "./ConfirmButton";
import { ClosingX } from "./Icons";

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4">
      {filteredApplications?.map((application) => (
        <div key={application.id} className="card shadow-lg relative">
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
    </div>
  );
};
