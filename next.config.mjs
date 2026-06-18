/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships ESM; let Next transpile it cleanly for the server bundle.
  transpilePackages: ["three"],
  // Same-origin proxy for the registration form → Frappe Forms Pro endpoint
  // (avoids browser CORS / preflight). Mirrors the Vite/Netlify proxy.
  async rewrites() {
    return [
      {
        source: "/api/forms_pro_submit",
        destination:
          "https://erp.elbrit.org/api/method/forms_pro.api.submission.submit_form_response",
      },
    ];
  },
};

export default nextConfig;
