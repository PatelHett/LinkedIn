import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function SearchInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  // const handleSearch = async () => {
  //   try {
  //     const ans = await handler(value);
  //     console.log(ans);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <Input
        type="email"
        onChange={handleChange}
        value={value}
        placeholder="Email"
        // onClick={handleSearch}
        className="bg-[#EDF3F8] w-80 rounded-lg border-none"
      />
    </div>
  );
}
