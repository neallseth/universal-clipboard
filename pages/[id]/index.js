import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");

export default function ClipView() {
  const router = useRouter();
  const { id } = router.query;

  const [clipData, setClipData] = useState(null);

  async function getClipData() {
    const res = await axios.get(`/api/clip?id=${id}`);
    setClipData(res.data);
  }

  useEffect(() => {
    try {
      getClipData();
    } catch (err) {
      console.log("err: ", err);
    }
  });

  return <p>{clipData ? clipData.clip_entry : "loading..."}</p>;
}
