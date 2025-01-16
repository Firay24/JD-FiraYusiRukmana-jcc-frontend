"use client";

import { useProfileStore } from "@/state/profile.state";
import { useShallow } from "zustand/react/shallow";
import One from "./One";
import Two from "./Two";
import Button from "@/components/base/Button";
import Documentation from "@/components/layout/Documentation";
import DocumentContainer from "@/components/layout/Documentation/DocumentContainer";

export default function page() {
  const titles = [
    //
    "ExampleProfile",
  ];
  return (
    <>
      <Documentation titles={titles}>
        <Profile />
      </Documentation>
    </>
  );
}

function Profile() {
  const [profile, fullName, fnProfile] = useProfileStore(useShallow((state) => [state.data, state.fn.getFullName(), state.fn]));
  return (
    <DocumentContainer title="ExampleProfile" monospace>
      <One />
      <Two />
      <p>
        Full Name : {profile?.firstName} {profile?.lastName} <br />
        fullName : {fullName}
      </p>
      <Button onClick={() => fnProfile.set(null)}>Reset</Button>
    </DocumentContainer>
  );
}
