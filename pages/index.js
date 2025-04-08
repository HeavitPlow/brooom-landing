export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-10 font-sans">
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">$BROOOM</h1>
        <p className="text-lg mb-2">당신의 자동차 NFT에 부스터를 달아주는 밈코인</p>
        <h2 className="text-2xl font-semibold mb-6">브룸하고, 리워드 받고!</h2>
        <button className="bg-black text-white px-6 py-3 rounded-full">NFT 등록하고 에어드랍 받기</button>
      </section>

      <section className="mb-20">
        <h3 className="text-2xl font-bold mb-4">왜 $BROOOM인가요?</h3>
        <ul className="list-disc pl-6 space-y-2 text-left max-w-md mx-auto">
          <li>자동차 NFT 등록 시 자동으로 $BROOOM 에어드랍</li>
          <li>커뮤니티 중심의 재미있는 레이싱 밈코인</li>
          <li>실제 차량 & 오프라인 사용처와 연결 가능성까지!</li>
        </ul>
      </section>

      <section className="mb-20 text-center">
        <h3 className="text-2xl font-bold mb-4">$BROOOM 커뮤니티와 함께 달리세요!</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#" className="border px-4 py-2 rounded">Twitter</a>
          <a href="#" className="border px-4 py-2 rounded">Discord</a>
          <a href="#" className="border px-4 py-2 rounded">커뮤니티 미션 참여하기 (coming soon)</a>
        </div>
      </section>

      <section className="text-center">
        <p className="text-xl font-semibold">귀엽게, 빠르게, $BROOOM하게</p>
      </section>
    </main>
  );
}
