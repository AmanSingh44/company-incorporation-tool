import React from "react";
import Layout from "../components/layout/Layout";
import ProgressSidebar from "../components/progress/ProgressSidebar";
import CompanyForm from "../components/forms/CompanyForm";

const CreateCompanyPage = () => {
  return (
    <Layout>
      <ProgressSidebar currentStep={1} />
      <CompanyForm />
    </Layout>
  );
};

export default CreateCompanyPage;
