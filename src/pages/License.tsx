
import React, { useState } from "react";
import { LicenseSelector } from "@/components/license/LicenseSelector";

const License = () => {
  // Add state for license type
  const [licenseType, setLicenseType] = useState<"client" | "developer">("client");

  // Handle license type change
  const handleLicenseChange = (value: string) => {
    setLicenseType(value as "client" | "developer");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">License Management</h1>
      <LicenseSelector 
        value={licenseType} 
        onChange={handleLicenseChange} 
      />
    </div>
  );
};

export default License;
