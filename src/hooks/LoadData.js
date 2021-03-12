import { useEffect, useState } from "react";

export default function useLoadData({ getData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  async function load() {
    setIsLoading(true);

    try {
      setData(await getData());
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => load, []);

  return { isLoading, data };
}
