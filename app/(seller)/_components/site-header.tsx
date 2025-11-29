// ============================================
// SITE HEADER COMPONENT
// ============================================
'use client'
import { ModeToggle, ThemeToggle } from "@/components/ThemeToggle";
import { Bell, LogOut, Moon, Search, Settings, Sun, User } from "lucide-react";
import { useState } from "react";

interface SiteHeaderProps {
  sidebarCollapsed: boolean;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ sidebarCollapsed }) => {
  const [isDark, setIsDark] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 bg-card border-b border-border z-30
        transition-all duration-300
        ${sidebarCollapsed ? 'left-20' : 'left-64'}
      `}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, analytics..."
              className="w-full pl-10 pr-4 py-2 bg-accent rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-lg bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Seller</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-border">
                  <p className="font-semibold text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-foreground transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-foreground transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-red-600 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
