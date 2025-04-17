"use client"

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
            Reaction Speed Test
          </h1>
          <p className="text-xl text-slate-300">
            Test your reflexes and challenge your friends!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Classic Mode</h2>
            <p className="text-slate-300 mb-6">
              Wait for the green light and click as fast as you can. Simple, yet challenging!
            </p>
            <Link 
              href="/game?mode=classic"
              className="inline-block bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Play Classic
            </Link>
          </div>

          <div className="bg-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Challenge Mode</h2>
            <p className="text-slate-300 mb-6">
              Unpredictable timing and patterns. Are you ready for the ultimate test?
            </p>
            <Link 
              href="/game?mode=challenge"
              className="inline-block bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Play Challenge
            </Link>
          </div>

          <div className="bg-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Zen Mode</h2>
            <p className="text-slate-300 mb-6">
              Consistent timing for focused practice. Perfect your reaction time.
            </p>
            <Link 
              href="/game?mode=zen"
              className="inline-block bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Play Zen
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Real-time Feedback</h3>
            <p className="text-slate-300">Get instant feedback on your reaction time and performance.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Track Progress</h3>
            <p className="text-slate-300">Monitor your improvement with detailed statistics and history.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Multiple Modes</h3>
            <p className="text-slate-300">Choose from different game modes to test various aspects of your reflexes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
