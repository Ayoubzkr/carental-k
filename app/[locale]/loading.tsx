export default function Loading() {
    return (
        <div className="fixed inset-0 bg-[#050505] z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#D4AF37] animate-spin"></div>
                </div>
                <p className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest animate-pulse">Chargement...</p>
            </div>
        </div>
    )
}

