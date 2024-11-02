import { AppSidebar } from "@/components/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from "@/components/ui/sidebar"
import WasteIndicator from "@/components/wasteIndicator"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription
} from "@/components/ui/card"
import { Utensils, Scale, TrendingDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "19rem"
				} as React.CSSProperties
			}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Ingredient Usage Overview</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>

				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-gradient-to-t from-primary/10 to-background min-h-screen">
					{/* Today's Usage Summary */}
					<div className="grid gap-4 md:grid-cols-3">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Today's Total Usage
								</CardTitle>
								<Scale className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">2.5 kg</div>
								<p className="text-xs text-muted-foreground">
									Across all ingredients
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Servings Prepared
								</CardTitle>
								<Utensils className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">45</div>
								<p className="text-xs text-muted-foreground">
									Total meals served today
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Average Per Serving
								</CardTitle>
								<TrendingDown className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">55.5g</div>
								<p className="text-xs text-muted-foreground">
									Per meal average
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Waste Indicator */}
					<Card>
						<CardHeader>
							<CardTitle>Current Waste Status</CardTitle>
							<CardDescription>Real-time waste monitoring</CardDescription>
						</CardHeader>
						<CardContent>
							<WasteIndicator />
						</CardContent>
					</Card>

					{/* 3-Day Prediction */}
					<Card>
						<CardHeader>
							<CardTitle>3-Day Usage Prediction</CardTitle>
							<CardDescription>
								ML-based ingredient usage forecast
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Tomorrow</span>
										<span className="text-sm text-muted-foreground">
											2.7 kg predicted
										</span>
									</div>
									<Progress value={90} className="h-2" />
								</div>

								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Day 2</span>
										<span className="text-sm text-muted-foreground">
											2.4 kg predicted
										</span>
									</div>
									<Progress value={80} className="h-2" />
								</div>

								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Day 3</span>
										<span className="text-sm text-muted-foreground">
											2.6 kg predicted
										</span>
									</div>
									<Progress value={85} className="h-2" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Most Used Ingredients Today */}
					<Card>
						<CardHeader>
							<CardTitle>Top Ingredients Usage Today</CardTitle>
							<CardDescription>
								Highest volume ingredients in today's menu items
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Beef</span>
										<span className="text-sm text-muted-foreground">800g</span>
									</div>
									<Progress value={80} className="h-2" />
								</div>

								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Lettuce</span>
										<span className="text-sm text-muted-foreground">500g</span>
									</div>
									<Progress value={50} className="h-2" />
								</div>

								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Tomatoes</span>
										<span className="text-sm text-muted-foreground">400g</span>
									</div>
									<Progress value={40} className="h-2" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
