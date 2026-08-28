# 麻雀レベル++

麻雀のアガリ形を見て点数を答え、点数計算を正確かつ素早く行う力を身につけるための学習アプリです。

- 公開URL：[https://mahjong-level-plus.vercel.app/](https://mahjong-level-plus.vercel.app/)
- 画面遷移図：[Figma](https://www.figma.com/design/86dEY795bQC7AJ52k4OuDa/%E9%BA%BB%E9%9B%80%E3%83%AC%E3%83%99%E3%83%AB--_%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3?node-id=9-86&p=f&t=B2ZANpjDxeDIBnml-0)
- ER図（将来構想）：[diagrams.net](https://app.diagrams.net/#G1l8L-phBt3neEeyPqQqkUjbIwZn7PAwFq#%7B%22pageId%22%3A%228bcgIEU77MefJeVwUgoD%22%7D)

## サービス概要

点数早見表や計算ツールで答えを調べるのではなく、実戦に近いアガリ形から自力で点数を導き出す反復練習に重点を置いています。

麻雀の基本ルールと主な役を覚えたものの、符・翻を含む点数計算にはまだ自信がない人が主な対象です。10問単位で気軽に挑戦でき、正解数と回答時間による得点、ランク、問題ごとの解説から成長を確認できます。

## 実装済みの機能

- 30種類の問題パターンから、1回につき10問を重複なしで出題
  - Aパターン15種類から5問、Bパターン15種類から5問をランダム抽出
  - 抽出した10問の出題順と、各問題の3つの選択肢をそれぞれランダム化
- 場風、自風、アガリ方（ロン・ツモ）、リーチ、ドラ、牌姿の表示
- 3択形式での点数回答
- 10区切りの進捗ゲージと回答時間の計測
- クイズの中断とトップ画面への移動
- 正解数、回答時間、タイムボーナスを使った得点計算
- 得点に応じた10段階のランク判定
- 問題ごとの回答結果と解説の表示
  - 選択した回答と正解
  - 自風、役、翻、符、ドラ
  - ツモアガリ時の支払い点とロン換算の点数
- 再挑戦、結果画面・トップ画面への移動
- 遊び方、得点・ランク、利用規約、プライバシーポリシーの表示
- スマートフォンとPCに対応したレスポンシブ表示

## 問題の出題仕様

問題の基本データは`frontend/src/features/quiz/data/question.ts`で管理しています。問題IDはデータの並びから自動生成されるため、問題ごとに変数を追加する必要はありません。

現在は次の30パターンで構成されています。

| 区分 | パターン数 | 1回の出題数 | 内容 |
| ---- | ---------- | ------------ | ---- |
| A    | 15         | 5            | 満貫以上など、符を回答表示に使用しない問題 |
| B    | 15         | 5            | 符計算を含む問題 |
| 合計 | 30         | 10           | 抽出後に順番をランダム化 |

出題数は`frontend/src/features/quiz/config/quizConfig.ts`の`QUIZ_QUESTION_COUNT`で管理しています。抽出処理と得点・ランク判定は設定値を参照するため、問題数を変更しやすい構成です。ただし、現在の画面表示と運用上の出題数は10問です。

## アプリの使い方

1. トップ画面の「スタート」ボタンを押します。
2. 場風、自風、アガリ方、リーチ、ドラ、牌姿を確認します。
3. 正しいと思う点数を3つの選択肢から選びます。
4. 10問すべてに回答します。途中で終了する場合は「中断する」を押します。
5. 結果画面で正解数、回答時間、タイムボーナス、最終得点、ランクを確認します。
6. 「解説を見る」から、各問題の選択した回答、正解、役、翻、符、点数の根拠を確認します。
7. 「もう一度挑戦」で再挑戦するか、「トップ画面」でトップへ戻ります。

## 得点とランク

現在の10問設定では、最終得点を次の式で計算します。

```text
正解点 = 正解数 × 1,000
タイムボーナス = min(500, floor(500 × 正答率 × 60,000 ÷ 回答時間(ms)))
最終得点 = 正解点 + タイムボーナス
```

- 正解点：1問1,000点（最大10,000点）
- タイムボーナス：正答率が高く、回答時間が短いほど増加（最大500点）
- 基準時間：60秒（60,000ミリ秒）
- 0問正解、または有効な回答時間がない場合：タイムボーナスは0点
- 最終得点：最大10,500点

ランクは次の10段階です。SSSランクには10,000点以上に加えて、10問全問正解が必要です。

| ランク | スコア                   | レベルの目安                                                               |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| SSS    | 10,000〜（10問全問正解） | 10問全問正解です。点数申告で卓を止める心配はほぼありません。               |
| SS     | 8,500〜9,999             | かなりの計算力です。点数表を開くより、あなたに聞く方が早そうです。         |
| S      | 7,000〜8,499             | 仲間内では頼れる点数係です。たまにはほかの人にも計算させてあげましょう。   |
| A      | 6,000〜6,999             | よく出るアガリ形なら安定しています。珍しい形でも慌てず計算してみましょう。 |
| B      | 5,000〜5,999             | 基本的な点数計算は身についています。符が増えたときだけ、少し慎重に。       |
| C      | 4,000〜4,999             | 家族麻雀なら、あなたが点数係を引き受けてあげてください。                   |
| D      | 3,000〜3,999             | 点数表があれば心強い段階です。まずはよく出る形から覚えましょう。           |
| E      | 2,000〜2,999             | 役と翻は見えてきました。符計算とは、これから仲良くなりましょう。           |
| F      | 1,000〜1,999             | 正解より先に選択肢と目が合う時期です。解説を読めば着実に伸びます。         |
| G      | 0〜999                   | ここがスタート地点です。伸びしろだけなら、すでにSSSランクです。            |

> ランクと説明は、本サービスのスコアをもとにした習熟度の目安です。出題数を設定で変更した場合、ランクのしきい値も10問時の基準から比例して調整されます。

## 技術スタック

| 分類           | 使用技術 |
| -------------- | -------- |
| フロントエンド | React 19.2 / TypeScript 6.0 |
| ルーティング   | React Router 7.18 |
| ビルドツール   | Vite 8.2 |
| スタイル       | Tailwind CSS 4.3 / daisyUI 5.7 |
| テスト         | Vitest 4.1 / React Testing Library 16.3 / jsdom |
| カバレッジ     | V8 Coverage |
| コード品質     | ESLint 10.8 / Prettier 3.9 |
| 開発環境       | Node.js 24 / npm / Docker Compose |
| デプロイ       | Vercel |

## ディレクトリ構成

```text
.
├── compose.yml                    # Docker Compose設定
├── README.md
├── issue_list.md
└── frontend/
    ├── Dockerfile
    ├── package.json               # 依存関係とnpm scripts
    ├── vercel.json                # VercelのSPA向け設定
    ├── vite.config.ts             # Vite・Vitest設定
    ├── public/
    │   └── assets/mahjong/        # 麻雀牌画像とライセンス
    └── src/
        ├── features/
        │   ├── privacy/           # プライバシーポリシー
        │   ├── quiz/              # 問題データ・抽出ロジック・問題画面
        │   ├── result/            # 結果・解説画面
        │   ├── terms/             # 利用規約
        │   └── top/               # トップ画面
        ├── test/                  # テスト共通設定
        ├── App.tsx                # ルーティング
        └── main.tsx               # エントリーポイント
```

## 開発環境の構築と起動

### Dockerを使用する場合（推奨）

前提として、GitとDocker Desktop（Docker Compose v2を含む）が必要です。

```bash
git clone https://github.com/saga-76/mahjong-level-plus.git
cd mahjong-level-plus
docker compose up --build
```

起動後、[http://localhost:5173](http://localhost:5173)へアクセスします。終了する場合は`Ctrl+C`を押した後、次を実行します。

```bash
docker compose down
```

### ローカルで直接起動する場合

前提として、Node.js 24とnpmが必要です。

```bash
git clone https://github.com/saga-76/mahjong-level-plus.git
cd mahjong-level-plus/frontend
npm ci
npm run dev
```

起動後、[http://localhost:5173](http://localhost:5173)へアクセスします。

## テスト・Lint・ビルド

ローカルで実行する場合は、`frontend`ディレクトリへ移動してから各コマンドを実行します。

```bash
cd frontend
npm run test:run       # テストを1回実行
npm run test:coverage  # テストとカバレッジ測定
npm run lint           # ESLint
npm run format:check   # Prettierの確認
npm run build          # 型チェックと本番ビルド
```

開発中にテストを監視モードで実行する場合は`npm test`、本番ビルドをローカルで確認する場合は`npm run preview`を使用します。

Dockerコンテナの起動中は、同じ処理を次のように実行できます。

```bash
docker compose exec frontend npm run test:run
docker compose exec frontend npm run test:coverage
docker compose exec frontend npm run lint
docker compose exec frontend npm run format:check
docker compose exec frontend npm run build
```

カバレッジのHTMLレポートは`frontend/coverage/index.html`に生成されます。

## データアクセスについて

現在は問題データをフロントエンドの静的データとして管理しており、データベースや外部APIへのアクセスはありません。そのため、現行実装ではSQLのN+1問題は発生しません。

問題と回答の照合には`Map`を使用し、ループ内で同じ配列を繰り返し探索しない構成にしています。将来バックエンドやデータベースを導入する場合は、SQLログや検出ツールを使って関連データの取得方法を確認します。

## 使用素材・ライセンス

### 麻雀牌画像

- 素材：[riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles)
- 作者：[FluffyStuff](https://github.com/FluffyStuff)
- ライセンス：[CC0 1.0（パブリックドメイン）](https://github.com/FluffyStuff/riichi-mahjong-tiles/blob/master/LICENSE.md)
- 使用バリエーション：Regular
- リポジトリ内のライセンス表記：`frontend/public/assets/mahjong/LICENSE.md`

アプリケーション本体のライセンスは、現時点では明示していません。

## 今後追加したい機能

- 難易度の選択と難易度別の問題セット
- 画面上での出題数の選択
- 問題パターンと解説内容の拡充
- 成績履歴、苦手分野、回答時間の記録・分析
- ユーザー登録・ログイン
- オンラインランキング
- バックエンドとデータベースの導入
