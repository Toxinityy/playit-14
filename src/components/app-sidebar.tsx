import { Home, Database ,Bot, History, ChevronDown } from "lucide-react"

import {
	Sidebar,
    SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home
	},
	{
		title: "Menu",
		url: "/menu",
		icon: Database
	},
    {
		title: "Ingredients",
		url: "/ingredients",
		icon: Database
	},
	{
		title: "History",
		url: "#",
		icon: History
	},
	{
		title: "Ai Prediction",
		url: "/prediction",
		icon: Bot
	},
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									Select Workspace
									<ChevronDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
								<DropdownMenuItem>
									<span>Acme Inc</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Acme Corp.</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
