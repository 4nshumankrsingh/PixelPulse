import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Camera,
  Zap,
  Star,
  ArrowRight,
  ImageIcon,
  Scissors,
  Expand,
  Target,
  Download,
  CheckCircle2,
  Play,
  Users,
  Clock,
  Shield,
  Sparkles,
  Upload,
  Wand2,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "AI Background Removal",
      description:
        "Remove backgrounds instantly with advanced AI technology. Perfect for product photos and portraits.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: <Expand className="h-8 w-8" />,
      title: "Smart Upscaling",
      description:
        "Enhance image quality and resolution without losing clarity using cutting-edge AI algorithms.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Object-Focused Cropping",
      description:
        "Intelligently crop images around specific objects with AI-powered detection and framing.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Process images in seconds, not minutes. Our optimized AI infrastructure delivers results instantly.",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Graphic Designer",
      content:
        "This tool has revolutionized my workflow. Background removal that used to take hours now takes seconds!",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "E-commerce Owner",
      content:
        "Perfect for product photography. The AI upscaling feature makes my images look professional.",
      rating: 5,
      avatar: "MJ",
    },
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      content:
        "The object cropping feature is incredible. It knows exactly what I want to focus on.",
      rating: 5,
      avatar: "ER",
    },
  ];

  const pricingFeatures = [
    "AI Background Removal",
    "Smart Image Upscaling",
    "Object-Focused Cropping",
    "High-Quality Downloads",
    "Fast Processing",
    "Cloud Storage",
  ];

  const stats = [
    { icon: <ImageIcon className="h-6 w-6" />, value: "10K+", label: "Images Processed" },
    { icon: <Users className="h-6 w-6" />, value: "2.5K+", label: "Active Users" },
    { icon: <Shield className="h-6 w-6" />, value: "99.9%", label: "Uptime" },
    { icon: <Star className="h-6 w-6" />, value: "4.8★", label: "User Rating" },
    { icon: <Clock className="h-6 w-6" />, value: "24/7", label: "AI Processing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-slate-50/95 backdrop-blur supports-[backdrop-filter]:bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                PixelPulse
              </span>
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              <Link
                href="#features"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                Reviews
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Try Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/30 px-4 py-2 text-sm">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-700">
                Powered by Advanced AI
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-800 sm:text-6xl">
              Transform Images with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 sm:text-xl">
              Professional image editing powered by artificial intelligence.
              Remove backgrounds, upscale images, and crop with precision - all
              in seconds.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="cursor-pointer gap-2 px-8 py-6 text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Play className="h-5 w-5" />
                  Try It Free Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer gap-2 px-8 py-6 text-base border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  <ImageIcon className="h-5 w-5" />
                  View Demo
                </Button>
              </Link>
            </div>

            <div className="mt-16">
              <p className="mb-8 text-sm text-slate-500">
                Trusted by thousands of creators worldwide
              </p>
              <div className="grid grid-cols-2 gap-6 opacity-80 sm:grid-cols-5">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-slate-700">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 text-center">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Powerful AI Tools at Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fingertips
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to create stunning images with the power of
              artificial intelligence
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-slate-200 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div
                    className={`${feature.bgColor} mb-4 inline-flex items-center justify-center rounded-xl p-3 ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Simple. Fast. Professional.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Get professional results in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: <Upload className="h-6 w-6" />,
                title: "Upload Your Image",
                description:
                  "Drag and drop or select your image. We support all major formats including JPG, PNG, and WebP.",
              },
              {
                step: "02",
                icon: <Wand2 className="h-6 w-6" />,
                title: "Choose AI Tools",
                description:
                  "Select from our powerful AI tools: background removal, upscaling, or object-focused cropping.",
              },
              {
                step: "03",
                icon: <Download className="h-6 w-6" />,
                title: "Download Results",
                description:
                  "Get your professionally edited image in seconds. High-quality results ready for any use.",
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="mb-6 flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    {item.icon}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                    {item.step}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Loved by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Creators
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              See what our users are saying about PixelPulse
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative border-slate-200 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-slate-600 italic leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="bg-gradient-to-br from-slate-50 to-blue-50/50 py-20 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Start Creating{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                For Free
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              No credit card required. Begin transforming your images instantly.
            </p>
          </div>

          <div className="mx-auto max-w-lg">
            <Card className="relative overflow-hidden border-2 border-blue-300 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-sm font-medium text-white rounded-bl-lg">
                Free to Start
              </div>
              <CardContent className="p-8">
                <div className="mb-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <FolderOpen className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Free Plan
                  </h3>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-slate-800">
                      $0
                    </span>
                    <span className="ml-2 text-slate-600">to start</span>
                  </div>
                  <p className="mt-2 text-slate-600">
                    Try all features with free credits
                  </p>
                </div>

                <ul className="mb-8 space-y-4">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/dashboard">
                  <Button
                    className="w-full cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-6 text-base"
                    size="lg"
                  >
                    <Zap className="h-5 w-5" />
                    Get Started Free
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Includes 10 free credits • No credit card required
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-100/70 to-purple-100/70 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Ready to Transform Your Images?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Join thousands of creators using AI to enhance their visual
              content
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-base hover:from-blue-600 hover:to-purple-700"
                >
                  <Camera className="h-5 w-5" />
                  Start Creating Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer gap-2 border-slate-300 px-8 py-6 text-base text-slate-700 hover:bg-slate-100"
                >
                  <ImageIcon className="h-5 w-5" />
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                    PixelPulse
                  </span>
                </div>
                <p className="max-w-md text-slate-600">
                  Professional image editing powered by artificial intelligence.
                  Transform your images with cutting-edge AI technology.
                </p>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-slate-800">Product</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>
                    <Link
                      href="#features"
                      className="transition-colors hover:text-blue-600"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="transition-colors hover:text-blue-600"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="transition-colors hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-slate-800">Support</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>
                    <Link
                      href="#"
                      className="transition-colors hover:text-blue-600"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="transition-colors hover:text-blue-600"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="transition-colors hover:text-blue-600"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
              <p>&copy; 2025 PixelPulse. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}