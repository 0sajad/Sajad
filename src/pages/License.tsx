
import React from "react";
import { LicenseSelector } from "@/components/license/LicenseSelector";

const License = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">License Management</h1>
      <LicenseSelector />
    </div>
  );
};

export default License;
