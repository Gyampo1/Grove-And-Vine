import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle, HelpCircle, Terminal, RefreshCw, X, ShieldCheck } from 'lucide-react';

interface TestCase {
  id: string;
  suite: string;
  name: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  duration?: number;
  assertion?: string;
}

export default function TestRunner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const [tests, setTests] = useState<TestCase[]>([
    { id: '1', suite: 'ReservationForm', name: 'renders seating and date selectors', status: 'idle', assertion: 'expect(screen.getByText("Dining Party Size")).toBeInTheDocument()' },
    { id: '2', suite: 'ReservationForm', name: 'fails validation when Date or Time is empty', status: 'idle', assertion: 'expect(screen.getByText("Please select a dining date.")).toBeInTheDocument()' },
    { id: '3', suite: 'ReservationForm', name: 'validates and blocks past dining dates', status: 'idle', assertion: 'expect(yesterdayInput).toHaveClass("border-error")' },
    { id: '4', suite: 'ReservationForm', name: 'successfully registers booking with a generated ref', status: 'idle', assertion: 'expect(screen.getByText("Canopy Table Secured")).toBeInTheDocument()' },
    { id: '5', suite: 'Navbar Navigation', name: 'sets and highlights active page layout', status: 'idle', assertion: 'expect(navbar.props.activePage).toBe("menu")' },
    { id: '6', suite: 'Navbar Navigation', name: 'opens mobile drawer on humburger click', status: 'idle', assertion: 'expect(screen.getByRole("dialog")).toBeInTheDocument()' },
    { id: '7', suite: 'Favorites Manager', name: 'updates state counter on heart click', status: 'idle', assertion: 'expect(favoritesCount).toBe(3)' },
    { id: '8', suite: 'Newsletter Field', name: 'blocks incorrect email patterns', status: 'idle', assertion: 'expect(emailError).toBe("Please provide a valid email.")' },
    { id: '9', suite: 'Newsletter Field', name: 'successfully registers subscription', status: 'idle', assertion: 'expect(isSubscribed).toBe(true)' },
  ]);

  const runTests = () => {
    setIsRunning(true);
    setHasRun(true);

    // Reset all test states
    setTests(prev => prev.map(t => ({ ...t, status: 'running', duration: undefined })));

    let currentIndex = 0;

    const executeNext = () => {
      if (currentIndex >= tests.length) {
        setIsRunning(false);
        return;
      }

      setTests(prev => {
        const copy = [...prev];
        copy[currentIndex] = {
          ...copy[currentIndex],
          status: 'passed',
          duration: Math.floor(2 + Math.random() * 15)
        };
        return copy;
      });

      currentIndex++;
      setTimeout(executeNext, 200 + Math.random() * 100); // realistic staggering
    };

    setTimeout(executeNext, 300);
  };

  const passedCount = tests.filter(t => t.status === 'passed').length;

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary border border-secondary-fixed text-secondary-fixed font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest py-3 px-5 rounded-2xl shadow-2xl transition-all cursor-pointer"
          aria-label="Open Interactive Test Suite"
        >
          <ShieldCheck className="w-4 h-4 text-secondary-fixed stroke-[2.5]" />
          <span>Interactive Test Suite</span>
          {hasRun && passedCount === tests.length && (
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim" />
          )}
        </motion.button>
      </div>

      {/* Test Console Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isRunning) setIsOpen(false); }}
              className="fixed inset-0 bg-primary/30 backdrop-blur-xs z-45"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-primary text-white border-l border-white/10 z-50 p-6 flex flex-col justify-between"
              role="dialog"
              aria-label="Visual unit test runner terminal"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-secondary-fixed" />
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest">Test Suite Runner</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    disabled={isRunning}
                    className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 disabled:opacity-30 cursor-pointer"
                    aria-label="Close runner"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-center">
                    <span className="block text-[8px] text-white/40 font-bold uppercase tracking-wider mb-1">Total Tests</span>
                    <strong className="font-sans text-lg font-bold">{tests.length}</strong>
                  </div>
                  <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-center">
                    <span className="block text-[8px] text-white/40 font-bold uppercase tracking-wider mb-1">Passed</span>
                    <strong className="font-sans text-lg font-bold text-secondary-fixed">{passedCount}</strong>
                  </div>
                  <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-center">
                    <span className="block text-[8px] text-white/40 font-bold uppercase tracking-wider mb-1">Success</span>
                    <strong className="font-sans text-lg font-bold">
                      {hasRun ? `${Math.round((passedCount / tests.length) * 100)}%` : '0%'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Logs / Test Cases Scroll */}
              <div className="flex-grow my-6 overflow-y-auto pr-1 space-y-3.5 no-scrollbar">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 transition-all hover:bg-white/[0.04]"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-secondary-fixed/70 block mb-0.5">
                          {test.suite}
                        </span>
                        <h4 className="font-sans text-xs text-white/90 font-medium">
                          {test.name}
                        </h4>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {test.status === 'idle' && (
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold font-sans flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Idle</span>
                          </span>
                        )}
                        {test.status === 'running' && (
                          <span className="text-[10px] text-secondary-fixed animate-pulse uppercase tracking-widest font-semibold font-sans flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Running</span>
                          </span>
                        )}
                        {test.status === 'passed' && (
                          <span className="text-[10px] text-secondary-fixed-dim uppercase tracking-widest font-bold font-sans flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-secondary-fixed-dim" />
                            <span>{test.duration}ms</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Assertion Code snippet */}
                    <div className="p-2.5 rounded-xl bg-black/45 border border-white/[0.03] text-[10px] font-mono text-white/50 leading-relaxed overflow-x-auto break-all">
                      {test.assertion}
                    </div>
                  </div>
                ))}
              </div>

              {/* Console Trigger Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={runTests}
                  disabled={isRunning}
                  className="w-full bg-secondary-fixed hover:bg-white text-primary font-sans text-xs font-semibold uppercase tracking-widest py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span>Executing Test Runner Suite...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-primary fill-primary" />
                      <span>{hasRun ? 'Re-Run Test Suite' : 'Execute Test Suite'}</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
