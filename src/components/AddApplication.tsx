"use client";
import { ApplicationsForm } from "./ApplicationsForm";
import type { JobApplicationData } from "./Applications";

const defaultApplication: JobApplicationData = {
  jobTitle: "",
  companyName: "",
  companyUrl: "",
  location: "",
  appliedDate: new Date(),
  contactPerson: "",
  contactEmail: "",
  notes: "",
  resumeUrl: "",
  jobDescriptionUrl: "",
};

export const AddApplication = ({
  createJobApplication,
  application = defaultApplication,
}: {
  createJobApplication: (data: JobApplicationData) => void;
  application?: JobApplicationData;
}) => {
  return (
    <ApplicationsForm
      applicationData={application}
      onSubmit={(data) => {
        createJobApplication(data);
      }}
    />
  );
};
