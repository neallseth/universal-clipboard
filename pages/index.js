import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Universal Clipboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Universal Clipboard 📋</h1>

        <p className="description">Paste here 📍 | Access anywhere 🌌</p>
        <div className="input-container">
          <textarea className="text-input" spellCheck="false"></textarea>
        </div>
        <button>Get Link</button>
      </main>

      <style jsx>{`
        .input-container {
          width: 100%;
          height: 25rem;
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
          border: none;
          background-color: #7caaff;
          cursor: pointer;
          transition: all 0.15s ease-in;
          letter-spacing: 0.1em;
          margin-top: 4rem;
          outline: none;
          font-size: 1.25rem;
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

        @media (max-width: 415px) {
          .title {
            font-size: 3rem;
          }
          .container {
            padding: 2rem 2rem;
          }
        }
        @media (max-height: 740px) {
          .input-container {
            margin-top: 0rem;
          }
        }

        @media (max-height: 670px) {
          .input-container {
            height: 20rem;
          }
        }
      `}</style>
    </div>
  );
}
