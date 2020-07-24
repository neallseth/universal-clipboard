export default function Loading() {
  return (
    <div className="loader">
      <style jsx>
        {`
          .loader {
            border: 0.5rem solid #0024746b;
            border-radius: 50%;
            border-top: 0.5rem solid #88b2ff;
            width: 8rem;
            height: 8rem;
            animation: spin 0.35s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
