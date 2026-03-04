import React from "react";
import Layout from "../components/layout/Layout";
import ProgressSidebar from "../components/progress/ProgressSidebar";
import ShareholderForm from "../components/forms/ShareholderForm";

const AddShareholdersPage = () => {
  return (
    <Layout>
      <ProgressSidebar currentStep={2} />

      {/* Pass the current shareholder index to ShareholderForm */}
      <ShareholderForm
        shareholderIndex={1}
        onNext={(data) => console.log(data)}
      />
    </Layout>
  );
};

export default AddShareholdersPage;
