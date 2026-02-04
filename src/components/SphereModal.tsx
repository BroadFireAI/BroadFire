import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SphereModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  color: [number, number, number];
  children?: React.ReactNode;
}

const SphereModal: React.FC<SphereModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  color,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const rgbColor = `rgb(${Math.round(color[0] * 255)}, ${Math.round(color[1] * 255)}, ${Math.round(color[2] * 255)})`;
  const rgbColorLight = `rgba(${Math.round(color[0] * 255)}, ${Math.round(color[1] * 255)}, ${Math.round(color[2] * 255)}, 0.15)`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
        style={{ animationDuration: '200ms' }}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative bg-white shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in"
        style={{
          animationDuration: '300ms',
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${rgbColorLight}`,
        }}
      >
        {/* Gradient header accent */}
        <div
          className="h-2"
          style={{
            background: `linear-gradient(90deg, ${rgbColor}, ${rgbColor}88, ${rgbColor})`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 transition-colors duration-200 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Decorative sphere icon */}
          <div
            className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${rgbColor}, ${rgbColor}88)`,
              boxShadow: `0 10px 30px -5px ${rgbColor}66`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, white, ${rgbColor})`,
              }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          {children && <div className="mt-6">{children}</div>}
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in ease-out forwards;
          }

          .animate-scale-in {
            animation: scale-in cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SphereModal;
