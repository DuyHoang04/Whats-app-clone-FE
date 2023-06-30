import useContact from "@/hooks/useContact";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  const [textSearch, setTextSearch] = useState<string>("");
  const { setContactSearchReq } = useContact();

  useEffect(() => {
    if (textSearch) {
      setContactSearchReq(textSearch);
    }
  }, [textSearch]);

  return (
    <div className="bg-search-input-container-background flex py-2 pl-5 items-center gap-3 h-14">
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-full flex-grow">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className="text-panel-header-icon cursor-pointer text-xl" />
      </div>
    </div>
  );
}

export default SearchBar;
