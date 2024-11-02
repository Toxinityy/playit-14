"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowRight, CheckCircle } from "lucide-react"

const LandingPage = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Navbar */}
			<nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<a href="/" className="text-2xl font-bold text-primary">
						YourBrand
					</a>
					<div className="space-x-4">
						<Button variant="ghost" asChild>
							<a href="/login">Login</a>
						</Button>
						<Button asChild>
							<a href="/register">Register</a>
						</Button>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="pt-32 pb-24 px-4 bg-gradient-to-b from-primary/10 to-background min-h-screen flex items-center">
				<div className="container mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Reducing Food Waste with AI-Powered Sourcing
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transforming how restaurants source ingredients by harnessing AI and machine learning to predict optimal purchasing based on local climate and demand. Our system helps you reduce food waste, save costs, and create a more sustainable dining experience.
					</p>
					<div className="flex justify-center gap-4">
						<Button size="lg" asChild>
							<a href="/register">
								Get Started <ArrowRight className="ml-2 h-4 w-4" />
							</a>
						</Button>
						<Button size="lg" variant="outline">
							Learn More
						</Button>
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-24 bg-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6">Our Mission</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering restaurants to make sustainable choices through data-driven insights. We aim to bridge the gap between demand forecasting and environmental responsibility, helping the food industry minimize waste and make better sourcing decisions.
					</p>
				</div>
			</section>

			{/* Key Benefits Section */}
			<section className="py-24 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center mb-16">Key Benefits</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								title: "Sustainable Sourcing",
								description:
									"Our platform reduces waste by advising on ingredient purchases based on real-time weather and location data, minimizing excess and promoting environmentally conscious decisions."
							},
							{
								title: "Cost Efficiency",
								description:
									"By optimizing inventory based on accurate demand predictions, we help reduce unnecessary spending and increase profitability."
							},
							{
								title: "Data-Driven Decisions",
								description:
									"Our AI-driven insights transform raw data into actionable recommendations, enabling smarter decisions tailored to your unique needs and location."
							}
						].map((benefit, index) => (
							<div
								key={index}
								className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
								<CheckCircle className="h-12 w-12 text-primary mb-4" />
								<h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
								<p className="text-muted-foreground">{benefit.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-24 bg-gradient-to-b from-primary/10 to-background">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6">
            Join Us in Revolutionizing Food Sourcing
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Take the first step towards smarter, sustainable restaurant operations. Let’s work together to reduce waste, cut costs, and build a greener food industry.
					</p>
					<Button size="lg" asChild>
						<a href="/register">
							Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
						</a>
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between px-4 py-2 text-white relative">
            <div className="text-left">
              <a href="#about-us" className="hover:text-gray-400">
                About Us
              </a>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <p>2024 YourBrand</p>
            </div>

            <div className="text-right">
              <button className="hover:text-gray-400 flex items-center transition-colors"
                  onClick={scrollToTop}>
                Back to Top <ArrowUp className="ml-1 h-4 w-4"></ArrowUp>
              </button>
            </div>
          </div>
        </div>
			</footer>
		</div>
	)
}

export default LandingPage
