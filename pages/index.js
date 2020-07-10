import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [userEntry, setUserEntry] = useState("");
  const [savedClipID, setSavedClipID] = useState(null);

  function userEntryIsValid() {
    return userEntry.trim() !== "" && userEntry.length < 5000;
  }

  async function handleCreateLink() {
    if (userEntryIsValid()) {
      const res = await axios.post("/api/clip", {
        clip_entry: userEntry,
      });
      console.log("res: ", res.data[0]);
      setSavedClipID(res.data[0].id);
    } else {
      console.log("nothing provided!");
      setUserEntry("");
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
          <textarea
            className="text-input"
            spellCheck="false"
            onChange={(e) => {
              if (!savedClipID) {
                setUserEntry(e.target.value);
              }
            }}
            value={userEntry}
          ></textarea>
        </div>
        {savedClipID ? (
          <Link href="/[id]" as={`/${savedClipID}`}>
            <button className="linkToClip">{`${window.location.host}/${savedClipID}`}</button>
          </Link>
        ) : (
          <button className="genLinkBtn" onClick={handleCreateLink}>
            Link 🔗
          </button>
        )}
      </main>

      <style jsx>{`
        .input-container {
          width: 100%;
          height: 40vh;
          margin-top: 3rem;
        }

        .text-input {
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background: #538bf3;
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

        button {
          border-radius: 0.4rem;
          height: 3rem;
          width: 100%;
          max-width: 15rem;
          border: 1px solid #406bbb;
          background: #5d91f1;
          cursor: pointer;
          transition: all 0.15s ease-in;
          letter-spacing: 0.1em;
          margin-top: 4rem;
          outline: none;
          font-size: 1.25rem;
        }

        .genLinkBtn {
          font-weight: 500;
          box-shadow: ${userEntryIsValid() ? "2px 2px 5px #004eff8f" : "none"};
          color: ${userEntryIsValid() ? "black" : "#292929"};
          cursor: ${userEntryIsValid() ? "pointer" : "default"};
        }

        .linkToClip {
          box-shadow: 2px 2px 10px #004eff52;
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
