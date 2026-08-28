import { Link } from 'react-router-dom'

const sectionClassName = 'space-y-3'
const headingClassName = 'text-xl font-semibold text-white sm:text-2xl'
const listClassName = 'list-decimal space-y-2 pl-6'

export function TermsPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#031a14] px-3 py-4 text-white sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.75),transparent_60%),linear-gradient(135deg,rgba(198,161,96,0.1),transparent_45%)]"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-3 flex justify-end sm:mb-6">
          <Link
            className="w-full bg-[#efe4cb] px-6 py-3 text-center text-base font-semibold tracking-[0.2em] text-[#063b2b] transition hover:bg-[#fff3d9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:min-w-40 sm:px-8 sm:text-lg"
            to="/"
          >
            トップ画面へ戻る
          </Link>
        </div>

        <article className="rounded-lg border-2 border-[#c6a160] bg-[#082f25]/95 px-4 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.7)] outline outline-1 -outline-offset-3 outline-[#d4ae6b]/40 sm:rounded-xl sm:px-10 sm:py-12">
          <header className="border-b border-[#c6a160]/60 pb-4 text-center sm:pb-6">
            <h1 className="text-2xl font-semibold tracking-[0.08em] text-white sm:text-4xl sm:tracking-[0.12em]">
              利用規約
            </h1>
          </header>

          <div className="mx-auto mt-6 max-w-3xl space-y-8 text-sm leading-relaxed sm:mt-8 sm:space-y-10 sm:text-base">
            <p>
              この利用規約（以下「本規約」といいます。）は、「麻雀レベル++」（以下「本サービス」といいます。）の利用条件を定めるものです。本サービスを利用する方（以下「利用者」といいます。）は、本規約に同意したうえで本サービスをご利用ください。
            </p>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>第1条（適用）</h2>
              <ol className={listClassName}>
                <li>
                  本規約は、利用者と本サービスの運営者との間の、本サービスの利用に関わるすべての関係に適用されます。
                </li>
                <li>
                  本サービス上の案内や注意事項は、本規約の一部を構成するものとします。
                </li>
              </ol>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>第2条（サービスの内容）</h2>
              <p>
                本サービスは、麻雀のアガリ形を使った点数計算問題、回答結果、スコア、ランクおよび解説を提供する学習用サービスです。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>第3条（禁止事項）</h2>
              <p>
                利用者は、本サービスの利用にあたり、次の行為をしてはなりません。
              </p>
              <ol className={listClassName}>
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  本サービスの運営を妨害し、または支障を与えるおそれのある行為
                </li>
                <li>本サービスまたは第三者の権利、利益、信用を侵害する行為</li>
                <li>
                  不正アクセス、過度な負荷をかける行為、その他本サービスの安全性を損なう行為
                </li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ol>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>第4条（知的財産権）</h2>
              <p>
                本サービスで使用する文章、プログラム、デザインその他のコンテンツに関する権利は、運営者または正当な権利を有する第三者に帰属します。利用者は、各コンテンツに適用されるライセンスまたは法令で認められる範囲を超えて利用してはなりません。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                第5条（サービス内容の変更・中断）
              </h2>
              <p>
                運営者は、必要と判断した場合、利用者への事前の通知なく、本サービスの内容を変更し、提供を中断し、または終了できるものとします。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>第6条（免責事項）</h2>
              <ol className={listClassName}>
                <li>
                  本サービスは麻雀の点数計算を学習するための情報を提供するものであり、その正確性、完全性、有用性を保証するものではありません。
                </li>
                <li>
                  利用者が本サービスを利用したこと、または利用できなかったことにより生じた損害について、運営者は法令上責任を負う場合を除き、責任を負いません。
                </li>
                <li>
                  本サービスから移動できる外部サイトの内容について、運営者は責任を負いません。
                </li>
              </ol>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>第7条（本規約の変更）</h2>
              <p>
                運営者は、必要に応じて本規約を変更できるものとします。変更後の規約は、本サービス上に表示した時点から効力を生じます。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>
                第8条（準拠法および裁判管轄）
              </h2>
              <p>
                本規約の解釈には日本法を準拠法とします。本サービスに関して紛争が生じた場合は、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
