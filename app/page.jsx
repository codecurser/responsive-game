"use client"

import Link from 'next/link'
import { Zap, Clock, Trophy, BarChart2, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Reaction Speed Test
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Challenge your reflexes, track your progress, and compete with friends in this exciting reaction time test!
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link 
                href="/game?mode=classic"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              >
                <Zap className="w-5 h-5" />
                Start Playing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Game Modes Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Choose Your Challenge
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 rounded-xl p-8 transition-all hover:-translate-y-2 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-400">Classic Mode</h3>
            </div>
            <p className="text-slate-300 mb-6">
              The traditional reaction test. Wait for the green light and click as fast as you can. Perfect for beginners!
            </p>
            <Link 
              href="/game?mode=classic"
              className="inline-block bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Play Classic
            </Link>
          </div>

          <div className="bg-white/10 rounded-xl p-8 transition-all hover:-translate-y-2 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-400">Challenge Mode</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Unpredictable timing and patterns. Test your reflexes under pressure with varying difficulty levels.
            </p>
            <Link 
              href="/game?mode=challenge"
              className="inline-block bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Play Challenge
            </Link>
          </div>

          <div className="bg-white/10 rounded-xl p-8 transition-all hover:-translate-y-2 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-400">Zen Mode</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Consistent timing for focused practice. Perfect your reaction time in a calm, controlled environment.
            </p>
            <Link 
              href="/game?mode=zen"
              className="inline-block bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Play Zen
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Why Choose Our Reaction Test?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BarChart2 className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Real-time Analytics</h3>
              <p className="text-slate-300">Get detailed statistics and insights about your reaction times and improvement.</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Compete with Friends</h3>
              <p className="text-slate-300">Challenge your friends and compare your reaction times on the leaderboard.</p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Track Progress</h3>
              <p className="text-slate-300">Monitor your improvement over time with detailed history and trends.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p>© {new Date().getFullYear()} Reaction Speed Test. All rights reserved.</p>
            <p className="mt-2">Test your reflexes, challenge your friends, and improve your reaction time!</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 