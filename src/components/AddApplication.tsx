"use client";
import { useState } from "react";
import type { JobApplication } from "@prisma/client";
import { api } from "~/trpc/react";
import { ApplicationsForm } from "./ApplicationsForm";

type JobApplicationData = Omit<
  JobApplication,
  "id" | "statuses" | "userId" | "deleted"
>;
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
  refetchApplications,
  application = defaultApplication,
}: {
  refetchApplications: () => void;
  application?: JobApplicationData;
}) => {
  const createJobApplication = api.jobApplication.create.useMutation({
    onSuccess: () => {
      refetchApplications();
    },
  });

  return (
    <ApplicationsForm
      applicationData={application}
      onSubmit={(data) => { createJobApplication.mutate(data); }}
    />
  );
};
