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
    <form
      className="mt-4 px-10 py-4"
      style={{ border: "solid 1px black", borderRadius: "10px" }}
      onSubmit={sumbitApplication}
    >
      <div className="flex flex-wrap">
        <label className="flex-1">
          <p>Job Title</p>

          <input
            className="input"
            name="jobTitle"
            value={application.jobTitle}
            onChange={updateJobData}
            type="text"
            placeholder="Software Engineer"
          />
        </label>
        <label className="flex-1">
          <p>Company Name</p>

          <input
            className="input"
            name="companyName"
            value={application.companyName}
            onChange={updateJobData}
            type="text"
            placeholder="Google"
          />
        </label>
        <label className="flex-1">
          <p>company URL</p>

          <input
            className="input"
            name="companyUrl"
            value={application.companyUrl}
            onChange={updateJobData}
            type="text"
            placeholder="https://www.google.com"
          />
        </label>
        <label className="flex-1">
          <p>Location</p>

          <input
            className="input"
            name="location"
            value={application.location}
            onChange={updateJobData}
            type="text"
            placeholder="Mountain View, CA"
          />
        </label>
        <label className="flex-1">
          <p>Date Applied</p>

          <input
            className="input"
            name="appliedDate"
            value={application.appliedDate?.toISOString().split("T")[0]}
            onChange={updateJobData}
            type="date"
          />
        </label>
        <label className="flex-1">
          <p>Contact Person</p>

          <input
            className="input"
            name="contactPerson"
            value={application.contactPerson}
            onChange={updateJobData}
            type="text"
            placeholder="Hiring Manager"
          />
        </label>
        <label className="flex-1">
          <p>Contact Email</p>

          <input
            className="input"
            name="contactEmail"
            value={application.contactEmail}
            onChange={updateJobData}
            type="email"
            placeholder="johndoe@email.com"
          />
        </label>
        <label className="flex-1">
          <p>Resume URL</p>

          <input
            className="input"
            name="resumeUrl"
            value={application.resumeUrl}
            onChange={updateJobData}
            type="url"
            placeholder="https://www.myweb.com/resume.pdf"
          />
        </label>
        <label className="flex-1">
          <p>Job Description URL</p>
          <input
            className="input"
            name="jobDescriptionUrl"
            value={application.jobDescriptionUrl}
            onChange={updateJobData}
            type="url"
            placeholder="https://www.companyweb.com/jobdescription.pdf"
          />
        </label>
      </div>
      <div className="my-2">
        <label className="flex flex-col">
          <p>Notes</p>
          <textarea
            className="textarea flex-1"
            name="notes"
            value={application.notes}
            onChange={updateJobData}
            placeholder="Notes about the job"
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
