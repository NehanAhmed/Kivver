// ============================================
// SIDEBAR COMPONENT
// ============================================
'use client'
import { 
  BarChart3, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  FileQuestion, 
  FolderOpen, 
  HelpCircle, 
  Home, 
  PenTool, 
  PlusCircle, 
  Settings, 
  Users 
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

interface NavSection {
  items: NavItem[];
  showDivider?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const mainNavItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', href: 'dashboard' },
    { icon: BookOpen, label: 'My Courses', href: 'courses' },
    { icon: PlusCircle, label: 'Create Course', href: 'create' },
    { icon: PenTool, label: 'Lesson Builder', href: 'lessons' },
    { icon: BarChart3, label: 'Analytics', href: 'analytics' },
    { icon: Users, label: 'Students', href: 'students' },
    { icon: FileQuestion, label: 'Quiz Manager', href: 'quizzes' },
    { icon: FolderOpen, label: 'Content Library', href: 'library' },
  ];

  const bottomNavItems: NavItem[] = [
    { icon: Settings, label: 'Settings', href: 'settings' },
    { icon: HelpCircle, label: 'Help & Support', href: 'help' },
  ];

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = activeItem === item.href;

    return (
      <button
        key={item.href}
        onClick={() => setActiveItem(item.href)}
        className={`
          w-full flex items-center gap-3 px-3 py-3 rounded-xl
          transition-all duration-200
          ${isActive
            ? 'bg-green-50 text-green-600 shadow-sm'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
          ${collapsed ? 'justify-center' : ''}
        `}
      >
        <Icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
        {!collapsed && (
          <span className="font-medium text-sm">{item.label}</span>
        )}
        {!collapsed && item.badge && (
          <span className="ml-auto bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-card border-r border-border
        transition-all duration-300 ease-in-out z-40 flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-xl">🦉</span>
            </div>
            <span className="font-bold text-lg text-foreground">Kivver</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto shadow-md">
            <span className="text-xl">🦉</span>
          </div>
        )}
      </div>

      {/* Main Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-2">
          {mainNavItems.map(renderNavItem)}
        </div>
      </nav>

      {/* Bottom Navigation Items */}
      <div className="flex-shrink-0 border-t border-border">
        <nav className="py-3 px-3">
          <div className="space-y-2">
            {bottomNavItems.map(renderNavItem)}
          </div>
        </nav>

        {/* Toggle Button */}
        <div className="p-3">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-accent hover:bg-accent/80 text-accent-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-2 text-sm font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};