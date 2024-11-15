"use client";
import type { JobApplicationData } from "./Applications";
import { ApplicationsForm } from "./ApplicationsForm";
import { Modal } from "./Modal";

type UpdateApplicationData = JobApplicationData & {id: string};

type Props = {
  updateApplication: (data: UpdateApplicationData) => void;
  application: UpdateApplicationData;
  isOpen: boolean;
  onClose: () => void;
};

export const EditApplication = ({ 
  updateApplication, 
  application,
  isOpen,
  onClose
}: Props) => {
  if (!application.id) {
    throw new Error("EditApplication requires an application id");
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      withButton
    >
      <ApplicationsForm
        applicationData={application}
        onSubmit={(data) => {
          updateApplication(data as UpdateApplicationData);
          onClose()
        }}
        submitText="Update Application"
      />
    </Modal>
  );
};
