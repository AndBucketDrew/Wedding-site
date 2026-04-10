export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin text-[#C9A96E]"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="10"
        />
      </svg>
    </div>
  )
}
