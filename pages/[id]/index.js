import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from "../../components/Loading";
import { motion, AnimatePresence } from "framer-motion";

export default function ClipView() {
  const router = useRouter();
  const { id } = router.query;

  const [clipData, setClipData] = useState(null);

  async function getClipData() {
    try {
      const res = await axios.get(`/api/clip?id=${id}`);
      setClipData(res.data);
    } catch (err) {
      console.log("err: ", JSON.stringify(err));
      setClipData({ id: null, clip_entry: "Error - clip does not exist" });
    }
  }

  useEffect(() => {
    getClipData();
  }, [id]);

  return (
    <div className="container">
      <Head>
        <title>Universal Clipboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Universal Clipboard</h1>
        <p className="description">Paste here 📍 Access anywhere 🌌</p>
        <div className="input-container">
          <AnimatePresence>
            {clipData ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{ width: "100%", height: "100%" }}
              >
                <textarea
                  disabled
                  className="text-input"
                  spellCheck="false"
                  value={clipData.clip_entry}
                ></textarea>
              </motion.div>
            ) : (
              <Loading />
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ width: "100%" }}
          >
            <div className="action-container">
              {clipData?.id ? (
                <div className="idDisplay">
                  <p>
                    Clip ID: <span>{id}</span>
                  </p>
                </div>
              ) : null}

              <Link href="/" as="/">
                <button className="newClipBtn" onClick={() => {}}>
                  Create New 📝
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <style jsx>{`
        .input-container {
          width: 100%;
          height: 40vh;
          margin-top: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .action-container {
          margin-top: 4rem;
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }

        .idDisplay {
          font-size: 1.25rem;
          background-color: #88b2ff40;
          border-radius: 0.5rem;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 15rem;
        }

        .idDisplay p {
          margin: 0;
        }

        .idDisplay span {
          font-weight: bold;
          padding-left: 0.75rem;
        }

        .text-input {
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background: transparent;
          box-shadow: 20px 20px 60px #4776cf, -20px -20px 60px #5fa0ff;
          font-size: 2rem;
          padding: 2.75rem;
          line-height: 1.25;
          color: black;
          border: none;
          outline: none;
          resize: none;
          -webkit-appearance: none;
        }

        .text-input:disabled {
          opacity: 1;
        }

        .container {
          min-height: 100vh;
          padding: 5rem 2rem;
          background: #538bf3;
          display: flex;
          justify-content: center;
        }

        button {
          border-radius: 0.4rem;
          height: 3rem;
          width: 100%;
          width: 15rem;
          border: none;
          background: #5d91f1;
          cursor: pointer;
          transition: all 0.15s ease-in;
          letter-spacing: 0.1em;
          outline: none;
          font-size: 1.25rem;
        }

        .newClipBtn {
          box-shadow: 4px 4px 10px #004eff52;
          background-color: #88b2ff;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 50rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          background: linear-gradient(to right, #002373, #007de4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        @media (max-width: 450px) {
          .title {
            font-size: 3rem;
          }

          .description {
            font-size: 1.25rem;
          }
          .container {
            padding: 2rem 2rem;
          }

          .text-input {
            font-size: 1.25rem;
            padding: 2rem;
          }
        }
        @media (max-height: 740px) {
          .input-container {
            margin-top: 1rem;
          }
        }

        @media (max-width: 750px) {
          .action-container {
            flex-direction: column;
            height: 12rem;
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
