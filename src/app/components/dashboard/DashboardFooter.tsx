export default function Footer(){
    return(
        <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <span>&copy; 2025</span>
              <span className="font-semibold text-blue-600 bg-clip-text">
                Clausia
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="/legal/privacypolicy"
                className="hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/legal/termsofservice"
                className="hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="mailto:clausia.app@gmail.com"
                className="hover:text-blue-600 transition-colors"
              >
                clausia.app@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
}