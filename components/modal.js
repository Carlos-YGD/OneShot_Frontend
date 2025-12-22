"use client";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-[#f8eed5] border border-black shadow-[4px_4px_0_#000] p-4 min-w-[320px] z-10">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        {children}
      </div>
    </div>
  );
}
