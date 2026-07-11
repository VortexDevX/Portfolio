const links = [
  ["LinkedIn", "https://linkedin.com/in/vaibhavpatel-dev/"],
  ["GitHub", "https://github.com/VortexDevX"],
  ["Resume", "/resume.pdf"],
];

export default function SocialLinks({ className = "", linkClassName = "" }) {
  return (
    <div className={className}>
      {links.map(([label, href]) => {
        const isResume = label === "Resume";
        return (
          <a
            key={label}
            href={href}
            target={isResume ? undefined : "_blank"}
            rel={isResume ? undefined : "noreferrer"}
            download={isResume || undefined}
            className={linkClassName}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
