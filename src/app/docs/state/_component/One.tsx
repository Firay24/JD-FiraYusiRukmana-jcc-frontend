"use client";

import InputText from "@/components/base/Input/InputText";
import { useProfileStore } from "@/state/profile.state";
import { useShallow } from "zustand/react/shallow";

export default function One() {
  const [dataProfile, fnProfile] = useProfileStore(useShallow((state) => [state.data, state.fn]));

  return (
    <>
      <p>First Name : {dataProfile?.firstName}</p>
      <InputText label="First Name" value={dataProfile?.firstName ?? ""} onChange={(e) => fnProfile.set({ ...dataProfile, firstName: e.target.value })} />
    </>
  );
}
