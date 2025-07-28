import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();

  
  const newsFeed = [
    {
      title: t("🚨 New PayPal Phishing Campaign Targets Users"),
      summary: t("Fake emails claim your account is suspended. Always check the sender and never click suspicious links."),
      date: "2025-06-12",
      link: "https://www.securitymagazine.com/articles/101279-recent-research-reveals-phish-free-paypal-phishing-scam"
    },
    {
      title: t("⚠️ .zip Domains Used in Malware Attacks"),
      summary: t("Attackers are using new .zip domains to trick users into downloading malware. Be cautious with unfamiliar links."),
      date: "2025-06-11",
      link: "https://efficientip.com/blog/a-year-in-review-google-zip-tld-dns-security-challenges/#:~:text=Malware%20Distribution,-The%20.&text=Cybercriminals%20can%20exploit%20the%20.,the%20risk%20of%20malware%20infection."
    },
    {
      title: t("🔒 Google Warns of Sophisticated Credential Stealing Sites"),
      summary: t("Google's security team has detected a rise in lookalike login pages. Always verify the URL before entering credentials."),
      date: "2025-06-10",
      link: "https://www.bloomberg.com/news/articles/2025-06-04/google-warns-hackers-stealing-salesforce-data-from-companies"
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 dark:text-blue-300 mb-4">
        {t("PhishPhantom")}
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-xl text-center">
        {t("Instantly scan and protect yourself from phishing websites.")}<br />
        {t("Stay safe online with real-time detection and easy-to-use tools.")}
      </p>
      <Link
        to="/scan"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded shadow transition mb-8"
      >
        {t("Start Scanning")}
      </Link>

      {/* News Feed Section */}
      <div className="w-full max-w-2xl bg-white/70 dark:bg-gray-900/70 rounded-xl shadow-lg p-6 mt-4"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid #e0eafc"
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-cyan-300 flex items-center gap-2">
          📰 {t("Latest Phishing Scams & Security News")}
        </h2>
        <ul className="space-y-4">
          {newsFeed.map((item, idx) => (
            <li key={idx} className="p-4 rounded-lg bg-blue-50 dark:bg-gray-800/60 shadow flex flex-col gap-1">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-cyan-200 hover:underline">
                {item.title}
              </a>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{item.summary}</span>
              <span className="text-xs text-gray-400 mt-1">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
