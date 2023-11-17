import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  items: any[];
  fields: string[];
}

interface Returns {
  data: any[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const useSearch = ({ items, fields }: Props): Returns => {
  const [data, setData] = useState<typeof items>([]);
  const [value, setValue] = useState<string>("");

  const search = () => {
    const data: typeof items = [];

    for (const item of items) {
      let isMatching: boolean = false;
      for (const field of fields) {
        if (item?.[field].toLowerCase().startsWith(value.toLowerCase())) {
          isMatching = true;
        }
      }

      if (isMatching) data.push(item);
    }

    setData(data);
  };

  useEffect(() => {
    setData(items);
    if (value) {
      search();
    }
  }, [value, items]);

  return {
    data,
    value,
    setValue,
  };
};

export default useSearch;
