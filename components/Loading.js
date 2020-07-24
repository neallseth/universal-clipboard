export default function Loading() {
  return (
    <div className="loader">
      <style jsx>
        {`
          .loader {
            border: 1.25rem solid #002474;
            border-radius: 50%;
            border-top: 1.25rem solid #88b2ff;
            width: 10rem;
            height: 10rem;
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
