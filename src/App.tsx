import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star, Flower2, Gift, Stars } from 'lucide-react';
import ParticleText from './components/ParticleText';

const FallingPetals = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; size: number }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `-${Math.random() * 10}s`,
      duration: `${Math.random() * 5 + 8}s`,
      size: Math.random() * 15 + 12,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute text-pink-300/50 animate-fall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <Flower2 width={p.size} height={p.size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden relative flex items-center justify-center font-sans">
      <FallingPetals />
      
      {/* Static Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 text-pink-300/60 animate-pulse"><Star size={40} fill="currentColor" /></div>
        <div className="absolute bottom-20 right-10 text-pink-400/50 animate-bounce"><Heart size={50} fill="currentColor" /></div>
        <div className="absolute top-1/4 right-1/4 text-pink-300/70 animate-pulse"><Sparkles size={30} /></div>
        <div className="absolute bottom-1/3 left-1/4 text-pink-400/60 animate-bounce" style={{ animationDelay: '1s' }}><Star size={24} fill="currentColor" /></div>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center w-full px-4"
          >
            <div className="bg-white/60 backdrop-blur-xl p-1.5 rounded-[2.5rem] shadow-2xl max-w-md w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-[2.5rem] blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-[2.3rem] border border-white/50 text-center overflow-hidden">
                {/* Decorative corner borders */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-pink-300 rounded-tl-xl"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-pink-300 rounded-tr-xl"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-300 rounded-bl-xl"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-300 rounded-br-xl"></div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-50 to-rose-100 shadow-inner border border-pink-200"
                >
                  <Gift className="w-12 h-12 text-pink-500" />
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-4 font-script leading-tight">
                  Mừng ngày 8/3
                </h1>
                
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-6"></div>
                
                <p className="text-pink-600/90 mb-10 text-lg font-medium">
                  Một món quà nhỏ gửi tới<br/>các bông hoa lớp 9E 🌸
                </p>
                
                <button
                  onClick={() => setIsOpen(true)}
                  className="group relative px-10 py-4 bg-gradient-to-r from-pink-400 hover:from-pink-500 to-rose-400 hover:to-rose-500 text-white rounded-full font-semibold text-lg shadow-xl shadow-pink-300/40 hover:shadow-pink-400/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full"
                >
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-in-out skew-x-12"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    Mở thiệp <Sparkles className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inside"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 w-full h-[45%] md:h-[50%] pointer-events-none">
              <ParticleText text="8/3" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 2.8, ease: "easeOut" }}
              className="absolute top-[45%] md:top-[50%] w-full max-w-3xl px-4 text-center pb-10"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 rounded-[2.5rem] blur opacity-50"></div>
                <div className="relative bg-white/85 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/80">
                  
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-100 to-rose-100 px-6 py-2 rounded-full shadow-lg border border-pink-200 flex items-center gap-2">
                    <Stars className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-pink-700 font-bold tracking-widest uppercase text-sm">Gửi 9E</span>
                    <Stars className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6 font-script mt-4">
                    Các nụ hồng rạng rỡ 🌸
                  </h2>
                  
                  <div className="space-y-4 text-lg md:text-xl text-pink-800/80 leading-relaxed font-medium">
                    <p>
                      Chúc các bạn có một ngày Quốc tế Phụ nữ thật tuyệt vời, luôn xinh đẹp, tươi tắn và ngập tràn hạnh phúc.
                    </p>
                    <p>
                      Chặng đường cấp 2 sắp khép lại, chúc cho tất cả chúng ta sẽ luôn giữ mãi những kỷ niệm đẹp này, và đặc biệt...
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 py-4 drop-shadow-sm">
                      100% đỗ Nguyện Vọng 1 nhé! ✨
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center items-center gap-4 text-pink-500">
                    <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-pink-300 rounded-full"></div>
                    <Heart className="w-8 h-8 fill-pink-500 animate-pulse text-pink-500 drop-shadow-md" />
                    <Heart className="w-6 h-6 fill-pink-400 animate-pulse text-pink-400 drop-shadow-md" style={{ animationDelay: '0.2s' }} />
                    <Heart className="w-4 h-4 fill-pink-300 animate-pulse text-pink-300 drop-shadow-md" style={{ animationDelay: '0.4s' }} />
                    <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
