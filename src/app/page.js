import Link from "next/link";
import { ArrowRight, Trophy, User, Heart, Users, Brain, Dumbbell } from "lucide-react";
import Header from "./components/header";
import { UserProvider } from "./context/userContext";

export default function Home() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary">
        <Header showAuth={false} showNavigation={false} isHomepage={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-block bg-onboarding-accent-start/20 text-onboarding-accent-start border border-onboarding-accent-start/30 px-3 py-1 rounded-full text-sm">
            🥋 AI-Powered Jiu-Jitsu Development
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-onboarding-text-primary mb-6 leading-tight">
            Train Smarter,
            <span className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end bg-clip-text text-transparent">
              {" "}
              Roll Better
            </span>
          </h1>
          <p className="text-xl text-onboarding-text-muted mb-8 max-w-2xl mx-auto">
            Get highly personalized training, mindset, and recovery plans tailored to your body type, goals, and
            constraints. Perfect for super heavyweights, lanky grapplers, and anyone looking to level up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <button className="bg-gradient-to-r from-onboarding-accent-end to-onboarding-accent-start hover:from-onboarding-accent-end/80 hover:to-onboarding-accent-start/80 text-onboarding-bg-primary text-lg px-8 py-3 rounded-md transition-colors inline-flex items-center">
                Create My Plan <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <button className="border border-onboarding-border-subtle text-onboarding-text-primary hover:bg-onboarding-hover-bg text-lg px-8 py-3 rounded-md bg-transparent transition-colors">
              See Example Plans
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-onboarding-text-primary mb-4">
            Your Personal BJJ Dream Team
          </h2>
          <p className="text-onboarding-text-muted text-lg max-w-2xl mx-auto">
            Multiple AI coaching personas work together to create your perfect training plan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-onboarding-text-primary font-semibold text-lg mb-2">Technical Coach</h3>
            <p className="text-onboarding-text-muted">
              Personalized drills, techniques, and rolling strategies based on your body type and skill level
            </p>
          </div>

          <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-onboarding-text-primary font-semibold text-lg mb-2">Mental Coach</h3>
            <p className="text-onboarding-text-muted">
              Competition prep, mindfulness techniques, and mental triggers for peak performance
            </p>
          </div>

          <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-onboarding-text-primary font-semibold text-lg mb-2">
              Recovery Specialist
            </h3>
            <p className="text-onboarding-text-muted">
              Injury prevention, mobility work, and recovery protocols tailored to your training load
            </p>
          </div>

          <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-onboarding-text-primary font-semibold text-lg mb-2">Strength Coach</h3>
            <p className="text-onboarding-text-muted">
              Off-mat conditioning, strength training, and energy system development
            </p>
          </div>

          <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-onboarding-text-primary font-semibold text-lg mb-2">
              Competition Strategist
            </h3>
            <p className="text-onboarding-text-muted">
              Game planning, match analysis, and competition-specific preparation
            </p>
          </div>

          <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-onboarding-text-primary font-semibold text-lg mb-2">
              Supportive Friend
            </h3>
            <p className="text-onboarding-text-muted">
              Positive reinforcement, motivation, and honest feedback to keep you on track
            </p>
          </div>
        </div>
      </section>

      </div>
    </UserProvider>
  );
}
