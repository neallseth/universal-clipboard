import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";

export default function Home() {
  const [userEntry, setUserEntry] = useState("");
  const [userClipIDEntry, setUserClipIDEntry] = useState("");
  const [userSubmission, setUserSubmission] = useState(false);

  function userEntryIsValid() {
    return userEntry.trim() !== "" && userEntry.length < 5000;
  }

  function userIDEntryIsValid() {
    return userClipIDEntry && typeof userClipIDEntry == "number";
  }

  async function handleCreateLink() {
    if (userEntryIsValid()) {
      setUserSubmission(true);
      const res = await axios.post("/api/clip", {
        clip_entry: userEntry,
      });
      console.log("res: ", res.data);
      const newClipID = res.data[0]?.id;
      if (newClipID) {
        Router.push("/[id]", `/${newClipID}`);
      }
    } else {
      setUserEntry("");
    }
  }

  function handleFindClip() {
    if (userIDEntryIsValid()) {
      Router.push("/[id]", `/${userClipIDEntry}`);
    }
  }

  function handleClipIDInput(input) {
    const parsedInput = parseInt(input, 10);
    if (parsedInput || input == "") {
      setUserClipIDEntry(parsedInput ? parsedInput : "");
    }
  }

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
          {userSubmission ? (
            <Loading />
          ) : (
            <textarea
              className="text-input"
              spellCheck="false"
              onChange={(e) => {
                setUserEntry(e.target.value);
              }}
              value={userEntry}
            ></textarea>
          )}
        </div>

        <div className="btnContainer">
          <AnimatePresence exitBeforeEnter>
            {userEntryIsValid() ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                key="genLinkBtn"
              >
                <button className="genLinkBtn" onClick={handleCreateLink}>
                  Link 🔗
                </button>
              </motion.span>
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                key="findClip"
              >
                <input
                  type="text"
                  className="findClipInput"
                  placeholder="ID"
                  value={userClipIDEntry}
                  onChange={(e) => handleClipIDInput(e.target.value)}
                ></input>
                <button className="findClipBtn" onClick={handleFindClip}>
                  Find Clip
                </button>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
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
          transition: all 0.15s ease-in;
          outline: none;
          resize: none;
          -webkit-appearance: none;
        }

        .container {
          min-height: 100vh;
          padding: 5rem 2rem;
          background: #538bf3;
          display: flex;
          justify-content: center;
        }

        .btnContainer {
          margin-top: 4rem;
          width: 100%;
          max-width: 15rem;
          display: flex;
          border-radius: 0.4rem;
        }

        .findClipInput {
          width: 30%;
          height: 100%;
          font-size: 1.5rem;
          text-align: center;
          border: none;
          outline: none;
          background: #538bf3;
          border-radius: 0.4rem 0rem 0rem 0.4rem;
          border: 2px solid #5d91f1;
        }

        .findClipBtn {
          width: 70%;
          background: #5d91f1;
          border-radius: 0rem 0.4rem 0.4rem 0rem;
          cursor: ${userIDEntryIsValid() ? "pointer" : "default"};
        }

        button {
          height: 3rem;
          width: 100%;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease-in;
          letter-spacing: 0.1em;
          outline: none;
          font-size: 1.25rem;
        }

        .genLinkBtn {
          border-radius: 0.4rem;
          font-weight: 500;
          width: 15rem;
          box-shadow: 2px 2px 35px #0039bc59;
          color: black;
          cursor: pointer;
          background: linear-gradient(to right, #658fec, #598aff);
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
          // background: linear-gradient(to right, #002373, #1f51c7);
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
      `}</style>
    </div>
  );
}
