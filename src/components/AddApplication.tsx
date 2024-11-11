"use client";
import { useState } from "react";
import type { JobApplication } from "@prisma/client";
import { api } from "~/trpc/react";

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
}: {
  refetchApplications: () => void;
}) => {
  const createJobApplication = api.jobApplication.create.useMutation({
    onSuccess: () => {
      console.log("application created");
      refetchApplications();
    },
  });
  const [application, setApplication] =
    useState<JobApplicationData>(defaultApplication);

  const updateJobData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === "appliedDate") {
      setApplication((prev: JobApplicationData) => ({
        ...prev,
        appliedDate: new Date(e.target.value),
      }));
    } else {
      setApplication((prev: JobApplicationData) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const sumbitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(application);
    createJobApplication.mutate(application);
    setApplication(defaultApplication);
  };

  return (
    <form className="mt-4 py-4 px-10" style={{border: "solid 1px black", borderRadius: "10px"}} onSubmit={sumbitApplication}>
      <div className="flex flex-wrap">
        <label>
          <p>Job Title</p>
          <input
            name="jobTitle"
            value={application.jobTitle}
            onChange={updateJobData}
            type="text"
          />
        </label>
        <label>
          <p>Company Name</p>
          <input
            name="companyName"
            value={application.companyName}
            onChange={updateJobData}
            type="text"
          />
        </label>
        <label>
          <p>company URL</p>
          <input
            name="companyUrl"
            value={application.companyUrl}
            onChange={updateJobData}
            type="text"
          />
        </label>
        <label>
          <p>Location</p>
          <input
            name="location"
            value={application.location}
            onChange={updateJobData}
            type="text"
          />
        </label>
        <label>
          <p>Date Applied</p>
          <input
            name="appliedDate"
            value={application.appliedDate?.toISOString().split("T")[0]}
            onChange={updateJobData}
            type="date"
          />
        </label>
        <label>
          <p>Contact Person</p>
          <input
            name="contactPerson"
            value={application.contactPerson}
            onChange={updateJobData}
            type="text"
          />
        </label>
        <label>
          <p>Contact Email</p>
          <input
            name="contactEmail"
            value={application.contactEmail}
            onChange={updateJobData}
            type="email"
          />
        </label>
        <label>
          <p>Resume URL</p>
          <input
            name="resumeUrl"
            value={application.resumeUrl}
            onChange={updateJobData}
            type="url"
          />
        </label>
        <label>
          <p>Job Description URL</p>
          <input
            name="jobDescriptionUrl"
            value={application.jobDescriptionUrl}
            onChange={updateJobData}
            type="url"
          />
        </label>
        <label className="flex">
          <p>Notes</p>
          <textarea
            name="notes"
            value={application.notes}
            onChange={updateJobData}
          />
        </label>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" type="submit">
          Add Application
        </button>
      </div>
    </form>
  );
};
