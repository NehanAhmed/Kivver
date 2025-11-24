export function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Languages", "Mobile App"],
    Company: ["About Us", "Careers", "Press", "Blog"],
    Resources: ["Help Center", "Community", "Research", "Privacy"],
    Social: ["Twitter", "Facebook", "Instagram", "YouTube"],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 md:py-20">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🦉</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Kivver
              </span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-xs">
              Making language learning free, fun, and effective for everyone.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-lg font-bold mb-5 tracking-tight">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-base inline-block hover:translate-x-1 transition-transform"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-base font-medium">
            © 2025 Kivver. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-base font-medium"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-base font-medium"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-base font-medium"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}