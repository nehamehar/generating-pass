import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-base text-center bg-gray-900 mt-9 text-slate-400">
      <div className="footer-bottom">
        <span className="mb-2">
          Made with ❤️ by{" "}
          <a
            href="mailto:nehamehar31@gmail.com"
            className="text-lg text-slate-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neha
          </a>
        </span>
        <a
          href="https://github.com/nehamehar/generating-pass"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="text-3xl text-white fab fa-github ml-[50rem]"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;