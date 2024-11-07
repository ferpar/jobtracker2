import type { JobApplication } from "@prisma/client";

type ApplicationsProps = {
  applications: JobApplication[];
};
// applications list / cards
export const ApplicationsList = ({applications}: ApplicationsProps) => {

  if (applications.length === 0) {
    return <p>No applications found</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {applications?.map((application) => (
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
              <strong>Applied:</strong> {application.appliedDate.toISOString().split("T")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

