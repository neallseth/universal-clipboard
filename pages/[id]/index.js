import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ClipView() {
  const router = useRouter();
  const { id } = router.query;

  const [clipData, setClipData] = useState(null);

  async function getClipData() {
    try {
      const res = await axios.get(`/api/clip?id=${id}`);
      setClipData(res.data);
    } catch (err) {
      console.log("err: ", err);
    }
  }

  useEffect(() => {
    getClipData();
  }, [id]);

  return <p>{clipData ? clipData.clip_entry : "loading..."}</p>;
}
