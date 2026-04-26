import { useEffect } from "react";

export function BottomSheet({ isOpen, onClose, children }) {
  // blocca scroll dietro (effetto app mobile)
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* sheet */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-2xl p-6 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* handle stile iPhone */}
        <div className="w-12 h-1 bg-gray-300 rounded mx-auto mb-4" />

        {children}
      </div>
    </div>
  );
}