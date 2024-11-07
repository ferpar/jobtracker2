"use client";
import { useState } from "react";
import type { JobApplication } from "@prisma/client";
import { api } from "~/trpc/react";

type JobApplicationData = Omit<JobApplication, "id" | "statuses" | "userId">;
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

export const AddApplication = ({ refetchApplications }: { refetchApplications: () => void}) => {
  const createJobApplication = api.jobApplication.create.useMutation();
  const [application, setApplication] =
    useState<JobApplicationData>(defaultApplication);
    
  const updateJobData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setApplication((prev: JobApplicationData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sumbitApplication = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    console.log(application);
    createJobApplication.mutate(application);
    setApplication(defaultApplication);
    if (refetchApplications) {
      refetchApplications();
    }
  }


  return (
    <form className="mt-4 flex flex-wrap" onSubmit={sumbitApplication}>
      <label>
        Job Title
        <input
          name="jobTitle"
          value={application.jobTitle}
          onChange={updateJobData}
          type="text"
        />
      </label>
      <label>
        Company Name
        <input
          name="companyName"
          value={application.companyName}
          onChange={updateJobData}
          type="text"
        />
      </label>
      <label>
        company URL
        <input
          name="companyUrl"
          value={application.companyUrl}
          onChange={updateJobData}
          type="text"
        />
      </label>
      <label>
        Location
        <input
          name="location"
          value={application.location}
          onChange={updateJobData}
          type="text"
        />
      </label>
      <label>
        Date Applied
        <input
          name="appliedDate"
          value={application.appliedDate?.toISOString().split("T")[0]}
          onChange={updateJobData}
          type="date"
        />
      </label>
      <label>
        Contact Person
        <input
          name="contactPerson"
          value={application.contactPerson}
          onChange={updateJobData}
          type="text"
        />
      </label>
      <label>
        Contact Email
        <input
          name="contactEmail"
          value={application.contactEmail}
          onChange={updateJobData}
          type="email"
        />
      </label>
      <label>
        Notes
        <textarea
          name="notes"
          value={application.notes}
          onChange={updateJobData}
        />
      </label>
      <label>
        Resume URL
        <input
          name="resumeUrl"
          value={application.resumeUrl}
          onChange={updateJobData}
          type="url"
        />
      </label>
      <label>
        Job Description URL
        <input
          name="jobDescriptionUrl"
          value={application.jobDescriptionUrl}
          onChange={updateJobData}
          type="url"
        />
      </label>
      <button type="submit">Add Application</button>
    </form>
  );
};