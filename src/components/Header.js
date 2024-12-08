import React from 'react';

function Header() {
  return (
    <>
      <style>
        {`
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #6941C6;
            color: #fff;
          }

          h1 {
            margin: 0;
            font-size: 1.5rem;
          }

          button {
            padding: 8px 16px;
            background-color: #fff;
            color: #6941C6;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
          }

          /* Hide Create Report on mobile */
          @media (max-width: 768px) {
            .desktop-only {
              display: none !important;
            }

            header {
              flex-direction: column;
              align-items: center;
              padding: 20px 10px;
            }

            h1 {
              font-size: 1.2rem;
              text-align: center;
            }
          }
        `}
      </style>

      <header>
        <h1>CITYWATCH</h1>
        <button className="desktop-only">Create Report</button>
      </header>
    </>
  );
}

export default Header;
