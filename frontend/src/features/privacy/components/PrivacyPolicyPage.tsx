import { Link } from 'react-router-dom'

const sectionClassName = 'space-y-3'
const headingClassName = 'text-xl font-semibold text-[#f1d49e] sm:text-2xl'
const listClassName = 'list-disc space-y-2 pl-6'

export function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#031a14] px-4 py-6 text-[#f5e7c8] sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.75),transparent_60%),linear-gradient(135deg,rgba(198,161,96,0.1),transparent_45%)]"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="mb-4 flex justify-end sm:mb-6">
          <Link
            className="rounded border border-[#c6a160] bg-[#123727] px-5 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e]"
            to="/"
          >
            トップ画面へ戻る
          </Link>
        </div>

        <article className="rounded-xl border-2 border-[#c6a160] bg-[#082f25]/95 px-5 py-8 shadow-[0_16px_40px_rgba(0,0,0,0.7)] outline outline-1 -outline-offset-3 outline-[#d4ae6b]/40 sm:px-10 sm:py-12">
          <header className="border-b border-[#c6a160]/60 pb-6 text-center">
            <p className="text-sm tracking-[0.3em] text-[#d4ae6b]">PRIVACY</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[0.08em] text-[#f1d49e] sm:text-4xl">
              プライバシーポリシー
            </h1>
          </header>

          <div className="mt-8 space-y-10 leading-relaxed">
            <p>
              「麻雀レベル++」（以下「本サービス」といいます。）は、利用者の情報を適切に取り扱うため、次のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
            </p>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>1. 取得する情報</h2>
              <p>
                現在、本サービスには会員登録、ログイン、お問い合わせフォームおよび決済機能はなく、氏名、メールアドレスなどの個人情報を利用者から直接取得していません。
              </p>
              <p>
                ただし、本サービスが利用するホスティングサービス「Vercel」において、IPアドレス、ブラウザや端末に関する情報、アクセス日時、リクエスト内容などのアクセス情報が自動的に処理される場合があります。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>2. 回答データの取り扱い</h2>
              <p>
                問題への回答、正解数、回答時間、スコアおよびランクは、利用中のブラウザ上でのみ処理されます。現在、これらの情報を本サービスのサーバーへ送信したり、データベースへ保存したりする機能はありません。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>3. 情報の利用目的</h2>
              <p>
                本サービスまたはホスティングサービスで処理されるアクセス情報は、次の目的で利用される場合があります。
              </p>
              <ul className={listClassName}>
                <li>本サービスの提供および安定した運営</li>
                <li>不具合の調査および改善</li>
                <li>不正アクセスなどの防止およびセキュリティの確保</li>
              </ul>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>4. Cookieおよびアクセス解析</h2>
              <p>
                現在、本サービスは、利用者を識別するためのCookieおよび独自のアクセス解析ツールを使用していません。これらを導入する場合は、取得する情報と利用目的を本ポリシーに追記します。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>5. 第三者への提供</h2>
              <p>
                本サービスは、法令に基づく場合を除き、取得した個人情報を本人の同意なく第三者へ提供しません。なお、本サービスの提供に必要な範囲で、ホスティングサービスの提供者がアクセス情報を処理する場合があります。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>6. 安全管理</h2>
              <p>
                本サービスは、取り扱う情報の漏えい、滅失または毀損を防止するため、合理的な安全管理措置を講じます。
              </p>
            </section>

            <section className={sectionClassName}>
              <h2 className={headingClassName}>7. 本ポリシーの変更</h2>
              <p>
                本サービスの機能追加、利用する外部サービスの変更または法令の改正などに応じて、本ポリシーを変更することがあります。変更後の内容は、本サービス上に表示した時点から適用されます。
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
