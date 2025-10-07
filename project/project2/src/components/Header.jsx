// import React from "react";

// export default function Header({ onCreateGroup, onLogoClick }) {


//   return (
//     <header className="header">
      
//       <h1 className="logo" >
//         Split Sqaure
//       </h1>
//       <div className="row gap">
       
//         <button className="btn" onClick={onCreateGroup}>
//           Create Group
//         </button>
//       </div>
//     </header>
//   );
// }
// src/components/Header.jsx

// export default function Header({ onCreateGroup }) {
//   return (
//     <header className="header">
//       <div className="container column center">
//         {/* Logo and tagline */}
//         <div className="logo-section">
//           <h1 className="logo">
//             Split <span className="highlight">Square</span>
//           </h1>
//           <p className="tagline">Split bills , Settle fast 🤑</p>
//         </div>

          
//           <button className="btn btn-primary" onClick={onCreateGroup}>
//             Create Group
//           </button>
//         </div>
      
//     </header>
//   );
// }

// src/components/Header.jsx
export default function Header({ onCreateGroup }) {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Left side: Logo + tagline */}
        <div className="logo-section">
          <h1 className="logo">
            Split <span className="highlight">Square</span>
          </h1>
          <p className="tagline">Split bills, settle fast 🤑</p>
        </div>

        {/* Right side: Create group button */}
        <button className="btn btn-primary" onClick={onCreateGroup}>
          Create Group
        </button>
      </div>
    </header>
  );
}
