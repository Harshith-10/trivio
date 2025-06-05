"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { BookOpen, Home, Trophy, User, Settings, LogOut, BarChart3, Grid3X3, Play } from "lucide-react"
import Avvvatars from "avvvatars-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Quizzes", href: "/quizzes", icon: Play },
  { name: "Categories", href: "/categories", icon: Grid3X3 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

const userNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "user",
  }

  const isActive = (href: string) => pathname === href

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ocean-500 to-trivio-500">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-medium bg-gradient-to-r from-ocean-600 to-trivio-600 bg-clip-text text-transparent">
            Trivio
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all items-center hover:translate-x-1.5 ${
                      isActive(item.href)
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-muted-foreground mb-2">Account</div>
            <ul role="list" className="-mx-2 space-y-1">
              {userNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all items-center hover:translate-x-1.5 ${
                      isActive(item.href)
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 border-t">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Avvvatars value={user.email} style="shape" size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={() => {
                // Handle logout
                window.location.href = "/"
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
