"use client";

import InputText from "@/components/base/Input/InputText";
import { useProfileStore } from "@/state/profile.state";
import { useShallow } from "zustand/react/shallow";

export default function Two() {
  const [dataProfile, fnProfile] = useProfileStore(useShallow((state) => [state.data, state.fn]));

  return (
    <>
      <p>Last Name : {dataProfile?.lastName}</p>
      <InputText label="Last Name" value={dataProfile?.lastName ?? ""} onChange={(e) => fnProfile.set({ ...dataProfile, lastName: e.target.value })} />
    </>
  );
}
