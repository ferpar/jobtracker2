import { Modal } from "./Modal";
import { type JobApplicationWithStatus } from "./ApplicationsList";

type ApplicationDetailsProps = {
  application: JobApplicationWithStatus;
  isOpen: boolean;
  onClose: () => void;
};

export const ApplicationDetails = ({ application, onClose, isOpen }: ApplicationDetailsProps) => {
  return (
    <Modal
      modalTitle={application.jobTitle}
      modalContent={
        <>
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
            <strong>Status:</strong> {application.statuses[0]?.status}
          </p>
          <p>
            <strong>Contact:</strong> {application.contactPerson}
          </p>
          <p>
            <strong>Email:</strong> {application.contactEmail}
          </p>
          <p>
            <strong>Notes:</strong> {application.notes}
          </p>
          <p>
            <strong>Resume:</strong>{" "}
            <a href={application.resumeUrl} target="_blank" rel="noreferrer">
              {application.resumeUrl}
            </a>
          </p>
          <p>
            <strong>Job Description:</strong>{" "}
            <a
              href={application.jobDescriptionUrl}
              target="_blank"
              rel="noreferrer"
            >
              {application.jobDescriptionUrl}
            </a>
          </p>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      withButton
    />
  );
};