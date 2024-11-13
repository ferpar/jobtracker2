"use client";
import { useState } from "react";
import type { JobApplication } from "@prisma/client";

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

type ApplicationsFormProps = {
  applicationData?: JobApplicationData;
  onSubmit?: (data: JobApplicationData) => void;
  onClose?: () => void;
};

export const ApplicationsForm = ({
  applicationData = defaultApplication,
  onSubmit = (data) => {
    console.log("no submit handler provided", data);
  },
  onClose,
}: ApplicationsFormProps) => {
  const [application, setApplication] =
    useState<JobApplicationData>(applicationData);

  const updateApplicationHandler = (
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

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(application);
    onClose && onClose();
  };

  return (
    <form
      className="mt-4 px-10 py-4"
      style={{ border: "solid 1px black", borderRadius: "10px" }}
      onSubmit={submitApplication}
    >
      <div className="flex flex-wrap">
        <label className="flex-1">
          <p>Job Title</p>

          <input
            className="input"
            name="jobTitle"
            value={application.jobTitle}
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
            type="date"
          />
        </label>
        <label className="flex-1">
          <p>Contact Person</p>

          <input
            className="input"
            name="contactPerson"
            value={application.contactPerson}
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
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
            onChange={updateApplicationHandler}
            placeholder="Notes about the job"
          />
        </label>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" type="submit">
          Add Application
        </button>
        {onClose && (
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
