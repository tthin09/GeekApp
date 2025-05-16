import Link from "next/link"

export default function Header() {
  return (
    <div className="flex h-[64px]">
      <div className="w-[200px] flex items-center px-6">
        <Link href="/albums">
          <img
            src="/assets/geekup-logo.svg"
            alt="Web logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Link>
      </div>
      <div>

      </div>
    </div>
  )
}