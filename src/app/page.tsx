import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  // Supabase(DB)에서 Era 리스트 조회
  const eras= await prisma.era.findMany({
    orderBy: { startDate: 'asc'},
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold">
        NCT WISH Archive
      </h1>
      <p className="text-sm text-gray-300">
        Supabase + Prisma 연결 테스트
      </p>

      {eras.length === 0 ? (
        <p className="text-sm text-gray-400">
          아직 등록된 Era가 없습니다. (seed 데이터 확인)
        </p>
      ) : (
        <ul className="mt-4 space-y-2 text-sm">
          {eras.map((era) => (
            <li key={era.id} className="border border-white/10 rounded-md px-3 py-2">
              <div className="font-semibold">{era.name}</div>
              <div className="text-xs text-gray-300">
                시작일:{' '}
                {new Date(era.startDate).toISOString().slice(0, 10)}
              </div>
              {era.description && (
                <div className="text-xs text-gray-400 mt-1">
                  {era.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}