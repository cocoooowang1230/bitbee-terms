"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: (string | { text: string; subitems: string[] })[];
  after?: string[];
};

const sections: Section[] = [
  { id: "organizers", title: "一、活動主辦及合作單位", items: [
    "主辦暨執行單位：三智科技股份有限公司（以下稱「Bitbee」）。",
    "統一編號：60502777。",
    "合作單位：hi!錢錢。",
    "hi!錢錢於本活動中為指定文章及合作內容之提供方；活動平台營運、任務審核、參加資格判定及獎勵發放，由Bitbee負責。",
    "活動客服及申訴窗口：Bitbee LINE社群。",
  ]},
  { id: "period", title: "二、活動期間", items: [
    "本活動期間自2026年8月17日起至2027年1月31日止。",
    "除個別活動頁另有公告外，活動截止時間暫以2027年1月31日23:59:59為準。",
    "本活動原則上以每兩週為一期，由hi!錢錢提供當期指定文章，實際文章、任務開始時間、截止時間及可分享平台，以各期Bitbee活動頁公告為準。",
    "使用者須於各期公告之任務期間內完成公開分享及資料提交；逾期提交者不予認列。",
    "任務是否於期限內完成，以Bitbee系統所記錄之提交時間為準。",
  ]},
  { id: "eligibility", title: "三、參加資格", paragraphs: ["參加者須同時符合下列條件："], items: [
    "已註冊並持有正常使用中的Bitbee會員帳號。",
    "參加者使用之社群帳號須為本人持有或具有合法管理權限。",
    "分享貼文及社群帳號須維持公開，使Bitbee審核人員可不經加好友、追蹤、登入私人帳號或取得特殊權限即可查看。",
    "社群帳號不得為零粉絲或明顯僅為取得活動獎勵而設立之帳號。",
    "若社群平台未公開顯示粉絲或追蹤者數，Bitbee得依帳號公開貼文、建立及使用狀況、互動紀錄、內容完整度與其他合理風險訊號進行綜合判斷。",
    "同一自然人原則上限以一個Bitbee會員帳號參加；不得使用多個帳號、冒用他人資料或以工作室、程式、自動化方式大量參與。",
    "參加者應遵守本活動條款、Bitbee會員規範及各社群平台之使用規則。",
    "Bitbee得於獎勵發放或提領前，要求參加者完成必要之身份、錢包或帳戶驗證；未於指定期限完成者，得暫緩發放或提領。",
  ]},
  { id: "platforms", title: "四、指定分享平台", paragraphs: ["本活動得依各期任務頁公告，開放下列全部或部分平台："], items: [
    "Facebook公開貼文。", "Instagram公開限時動態。", "Threads公開貼文。", "Bitbee另行公告之其他公開社群平台或分享形式。"
  ], after: [
    "私人帳號貼文、限好友查看、私人社團、私人訊息、無法公開開啟之貼文，原則上不列入有效分享。",
    "Instagram限時動態若經個別任務頁明確列為有效形式，應依該期另行公告之提交時限及驗證方式辦理，不適用一般公開貼文於期末再次開啟網址複查之全部規則。",
  ]},
  { id: "valid-share", title: "五、有效分享及計次規則", paragraphs: ["每筆有效分享須符合下列條件："], items: [
    "分享Bitbee活動頁所指定之正確hi!錢錢文章。", "於指定任務期間內發布及提交。", "發布至該期任務允許之社群平台及形式。",
    "貼文及帳號保持公開，並於Bitbee完成最終審核前持續可供查看。", "提交正確且可公開開啟之貼文網址。", "提交符合規格之完整分享截圖。",
    "貼文內容足以辨識指定文章，不得以不相關、誤導、空白或刻意遮蔽之內容提交。", "同一Bitbee會員就同一篇文章分享至同一平台，最多認列一次。",
    "同一篇文章分享至不同有效平台，可分別計算。", "不同指定文章得重新計算。", "同一社群貼文不得由不同Bitbee會員重複提交。",
    "同一網址、截圖或實質相同之分享紀錄不得重複取得獎勵。", "每期每位參加者可完成之最高次數，以該期活動頁所列文章數量及有效平台數量為準。",
  ], after: ["僅完成分享但未在期限內提交，或僅提交資料但公開貼文不存在者，均不構成有效分享。"]},
  { id: "content", title: "六、文案及文章內容", items: [
    "使用者應分享正確的指定文章，並使貼文足以辨識文章內容或主題。", "Bitbee得提供推薦文案、圖片、標籤或分享範例，供使用者參考。",
    "使用者自行撰寫之內容不得包含虛偽、誤導、違法、侵權、仇恨、歧視或其他違反社群平台規則之內容。", "使用者不得以與指定文章無關之文字、隱藏文章連結或其他規避真實分享目的之方式完成任務。",
  ]},
  { id: "submission", title: "七、使用者應提交之資料", paragraphs: ["每筆任務至少應提交："], items: [
    "可公開開啟之社群貼文網址。", "完整分享截圖。", "對應之指定文章及社群平台。", "個別任務頁要求之其他必要資料。",
  ], after: [
    "完整截圖原則上應能辨識：社群帳號名稱或識別資訊、貼文內容、指定文章／文章預覽／文章連結，以及發布畫面或可供判斷發布時間之資訊。",
    "截圖僅為提交當下之輔助證明；最終仍以公開貼文網址之複查結果及Bitbee審核紀錄為主要依據。",
  ]},
  { id: "review", title: "八、審核及補件", items: [
    "Bitbee原則上於使用者提交後3至7個工作天內完成初步審核；工作天不包含週六、週日、國定假日及政府公告停止上班日。",
    "如遇大量提交、社群平台異常、系統故障、需進一步查證或其他合理情形，審核時間得延長，Bitbee將視情況公告或通知。",
    { text: "審核內容包括但不限於：", subitems: ["公開網址能否正常開啟。", "社群帳號及貼文是否公開。", "是否為正確指定文章。", "是否於有效期間內發布及提交。", "是否重複提交。", "截圖與公開貼文是否一致。", "帳號是否符合參加資格。", "是否存在異常、冒用或作弊情形。"] },
    "若資料缺漏、網址錯誤、截圖不完整或其他可補正之情形，使用者可於指定期限內補件。", "補件不代表必然通過審核；補件後仍須符合當期任務規則。",
    "逾期未補件、補件內容仍不完整，或原始貼文已刪除、轉為私人或無法開啟者，Bitbee得判定任務無效。", "有效分享及獎勵資格之最終認定，由Bitbee依活動規則及實際資料審核判定。",
    "使用者對審核結果有異議者，可透過活動客服窗口提出申訴並提供相關證明。",
  ]},
  { id: "rewards", title: "九、基本獎勵", items: [
    "各期任務之單筆獎勵金額、獎勵種類、認列上限及發放條件，以使用者參與或提交任務時，該期Bitbee活動頁所公告之版本為準。",
    "獎勵包括BTC、Honey（LINE Points）或Bitbee公告之其他獎勵。", "活動頁所稱「NT$＿元等值BTC」，係指依Bitbee公告之換算方式計算之BTC獎勵，並非現金給付、投資建議或保證增值。",
    "BTC之實際發放數量可能因換算時間及市場價格而不同；實際換算時點及數量以Bitbee系統紀錄為準。", "使用者完成任務並提交，不代表已取得獎勵；須經Bitbee審核認定為有效分享後，始取得獎勵資格。",
    "各期獎勵原則上於每兩週一期之活動結束並完成審核後統一發放。", "因補件、申訴、異常審查或身份驗證所延長之案件，得延後至後續批次發放。",
    "獎勵之入帳、使用、兌換及提領，另應符合Bitbee平台及合作錢包所公告之規則、最低門檻、驗證及手續費規定。",
  ]},
  { id: "adjustments", title: "十、獎勵及規則調整", items: [
    "各檔期之任務期間、指定文章、有效平台、單筆獎勵、Bonus門檻、Bonus名額、獎勵種類及其他適用條件，以使用者參與及提交任務時，Bitbee活動頁所公告之有效版本為準。",
    "Bitbee得依活動執行情形、有效分享進度、獎勵預算、異常參與狀況或其他合理營運需求，調整尚未開始之檔期，或公告生效時間後之任務獎勵與規則。",
    "相關調整應於活動頁或Bitbee指定渠道公告其內容、生效時間及適用範圍。", "除使用者違反規則、未通過審核、系統顯示錯誤、重複發放或其他依法得撤銷之情形外，規則調整不溯及減少使用者於生效前已依當時規則完成且經審核認定有效之基本獎勵資格。",
    "使用者於新規則生效後發布或提交之任務，適用更新後之活動規則。", "活動頁應標示規則版本、更新時間、生效時間及重大調整內容，以供使用者查閱。",
  ]},
  { id: "bonus", title: "十一、Bonus規則", items: [
    "Bonus屬限時、限量之額外加碼獎勵，並非每筆有效分享均必然取得。", "Bitbee得於活動期間新增Bonus，實際門檻、適用期間、計算方式、獎勵種類、名額及額滿狀態，以Bonus活動頁所載內容為準。",
    "是否追加名額或獎勵，由Bitbee依活動成效及可用獎勵額度另行公告。",
  ]},
  { id: "prohibited", title: "十二、禁止行為及作弊處理", paragraphs: ["參加者不得從事下列行為："], items: [
    "不同會員使用相同貼文網址、相同截圖或實質相同之分享證明。", "同一會員重複提交已認列之貼文、網址或截圖。", "盜用、擷取、修改或冒用他人貼文、網址、社群帳號或截圖。",
    "使用零粉絲、空白、新建後無合理使用紀錄或明顯僅為領取獎勵而建立之帳號。", "使用多個Bitbee帳號、冒用身份、虛構資料或規避身份與錢包限制。",
    "以程式、自動化工具、機器人、模擬器、工作室、交換點擊或其他非自然方式參與。", "提交後立即刪除貼文、改為私人、限制查看，或於最終審核前使Bitbee無法複查。",
    "偽造、修改或隱藏貼文時間、內容、帳號資訊或其他審核資料。", "以不正當方式干擾活動、系統或其他參加者。", "其他經Bitbee依具體事證合理判定違反活動目的或公平性之行為。",
  ], after: [
    "如Bitbee發現或合理懷疑參加者有上述情形，得採取下列一項或多項措施：暫緩審核或獎勵發放；要求補件、身份驗證或帳號控制權證明；取消部分或全部任務及Bonus資格；暫停或終止活動參與資格；暫停或終止Bitbee帳號；取消尚未發放之獎勵；扣回尚存於Bitbee帳戶內之錯誤或不當獎勵；對已發放之獎勵通知返還；涉及違法時，保留依法處理及追究相關責任之權利。",
    "使用者對作弊判定有異議者，得依第八條所定期限提出申訴。",
  ]},
  { id: "deletion", title: "十三、貼文刪除及獎勵追回", items: [
    "使用者應使公開貼文至少保留至該期最終審核完成。", "若貼文於審核完成前遭刪除、隱藏、轉為私人或無法開啟，該筆分享得判定無效。",
    "若Bitbee於獎勵發放後發現使用者使用盜用貼文、偽造截圖、重複提交或其他作弊方式取得獎勵，Bitbee得取消資格並回收、扣回或請求返還相關獎勵。",
    "因社群平台本身故障、下架或帳號遭第三方不當處理者，使用者應於申訴期限內提出證明，由Bitbee個案審核。",
  ]},
  { id: "privacy", title: "十四、個人資料及活動資料", items: [
    { text: "為辦理會員識別、任務審核、防弊、獎勵發放、客服申訴、活動統計及合作成果報告，Bitbee可能蒐集及處理：", subitems: ["Bitbee會員識別資料。", "LINE或其他登入識別資訊。", "社群帳號、公開貼文網址及截圖。", "任務提交、審核、補件及申訴紀錄。", "獎勵、錢包及提領相關紀錄。", "為防弊所必要之裝置、網路或風險紀錄。"] },
    "前述資料僅於活動執行、審核、防弊、獎勵發放、爭議處理、法令遵循及合作成果統計之必要範圍內利用。", "Bitbee得向hi!錢錢提供去識別化或統計形式之活動成果；如需提供可識別特定使用者之資料，應另有適法依據或取得使用者同意。",
    "使用者提交截圖前，應避免揭露與任務無關之私人對話、第三人個資或其他敏感內容。", "個人資料之其他權利及處理方式，依Bitbee另行公告之隱私權政策及相關法令辦理。",
  ]},
  { id: "rights", title: "十五、使用者內容及權利", items: [
    "使用者應確保所發布及提交之文字、圖片、帳號與其他內容，未侵害第三人之著作權、商標權、肖像權、隱私權或其他權利。", "使用者仍保有其原創內容之權利。",
    "為任務審核、客服、申訴、活動統計及向合作方提供成果報告之必要範圍，使用者同意Bitbee得保存、檢視及使用其提交之公開網址及截圖。",
    "未經使用者另行同意，Bitbee及hi!錢錢不得將可識別使用者之貼文截圖另行用於本活動範圍外之商業宣傳。",
  ]},
  { id: "changes", title: "十六、活動變更、暫停及終止", items: [
    "如因天災、戰爭、政府命令、法令或平台政策變更、社群平台故障、系統異常、資安事件、第三方服務中斷或其他非Bitbee可合理控制之事由，Bitbee得暫停、調整或終止活動。",
    "重大變更、暫停或終止，Bitbee將於活動頁或指定渠道公告。", "除因違規、無效提交、系統錯誤或依法得撤銷之情形外，活動提前終止原則上不影響終止前已完成且經審核有效之基本獎勵資格。",
  ]},
  { id: "liability", title: "十七、責任限制", items: [
    "使用者應自行確認其裝置、網路、社群帳號及公開設定符合任務要求。", "因使用者操作錯誤、網路中斷、裝置故障、社群帳號限制、平台政策或第三方服務所造成之提交失敗，Bitbee得依實際情況協助處理，但不保證任務必然認列。",
    "Facebook、Instagram、Threads、LINE及其他第三方平台並非本活動主辦或贊助單位，本活動亦不代表前述平台對本活動之支持或保證。", "本條不得解釋為排除Bitbee依法應負之責任。",
  ]},
  { id: "agreement", title: "十八、條款同意及其他", items: [
    "使用者參加、提交任務或領取獎勵，即表示已閱讀、理解並同意當時有效之活動條款及任務頁規則。", "個別任務頁就指定文章、期間、平台、單筆獎勵及Bonus所作之明確公告，構成本活動條款之一部分。",
    "活動條款與個別任務頁如有牴觸，以對該期任務規定較具體且生效時間較後者為準；但不得溯及減少使用者已完成且經審核有效之基本獎勵。", "本條款如有未盡事宜，依中華民國法令及誠信、公平原則處理。",
    "任何條款如經認定全部或部分無效，不影響其他條款之效力。", "本活動相關爭議，雙方應先透過客服及申訴程序協商處理；如仍無法解決，依相關法令所定之管轄法院處理。",
  ]},
];

export default function Home() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Bitbee × hi!錢錢活動條款首頁">
          <span className="brand-mark">B</span><span>Bitbee</span><b>×</b><span className="money-brand">hi!錢錢</span>
        </a>
        <a className="support-link" href="https://line.me/ti/g2/WWiLvj9M5sOC-UvDEZWulezT1IB-yK-Tr5Dzcw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noreferrer">聯絡客服 ↗</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" />
          <div className="eyebrow"><span /> 理財文章分享任務</div>
          <h1>Bitbee <i>×</i> hi!錢錢<br /><strong>理財文章分享任務</strong></h1>
          <div className="reward-summary">
            <p>公開分享 1 次</p>
            <strong>獲得 <mark>0.000001 Honey</mark></strong>
            <span>每月有 12 次分享機會，最多可拿 0.000012 Honey</span>
          </div>
          <div className="quick-rules">
            <section className="how-to">
              <h2>參加方式</h2>
              <div className="steps">
                <div><b>①</b><span><strong>選文章</strong><small>複製當期指定理財文章</small></span></div>
                <div><b>②</b><span><strong>公開分享</strong><small>分享至 Facebook、Threads 或 Instagram 限時動態</small></span></div>
                <div><b>③</b><span><strong>提交審核</strong><small>回到 Bitbee 提交分享網址與截圖</small></span></div>
              </div>
            </section>
            <section className="count-card">
              <h2>次數怎麼算？</h2>
              <p><strong>1 篇文章 × 3 個平台</strong><span>＝最多 3 次</span></p>
              <p><strong>每兩週更新 2 篇</strong><span>最多可分享 6 次</span></p>
              <small>分享帳號與內容須公開；審核通過後，獎勵將於當期結算後統一發放。</small>
            </section>
            <section className="valid-card">
              <h2>有效分享必須符合</h2>
              <ul>
                <li>使用本人持有或具有管理權限的社群帳號。</li>
                <li>社群帳號及分享內容必須公開。</li>
                <li>不得使用零粉絲、空白或明顯僅為領取獎勵而建立的帳號。</li>
              </ul>
            </section>
          </div>
          <div className="compact-meta">活動規則 v1.1　·　更新及生效：2026.08.12 12:00　·　臺灣時間 GMT+8</div>
          <a className="read-button" href="#terms-start">閱讀完整活動條款 <span>↓</span></a>
        </section>

        <div id="terms-start" className="terms-heading">
          <span>FULL TERMS</span>
          <h2>活動辦法暨使用者條款</h2>
          <p>參與、提交任務或領取獎勵，即表示您已閱讀、理解並同意當時有效的活動條款。</p>
        </div>

        <details className="mobile-toc">
          <summary>條款目錄 <span>共 18 章</span></summary>
          <nav>{sections.map((s) => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav>
        </details>

        <div className="document-layout">
          <aside className="toc">
            <div className="toc-label">條款目錄</div>
            <nav>{sections.map((s) => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav>
          </aside>

          <article className="terms">
            <div className="notice"><span>重要提醒</span><p>各期指定文章、任務期間、有效平台及獎勵，以參與及提交任務時的 Bitbee 活動頁公告為準。</p></div>
            {sections.map((section) => (
              <section id={section.id} className="term-section" key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {section.items && <ol>{section.items.map((item, index) => (
                  <li key={index}>{typeof item === "string" ? (
                    section.id === "organizers" && index === 4
                      ? <>活動客服及申訴窗口：<a href="https://line.me/ti/g2/WWiLvj9M5sOC-UvDEZWulezT1IB-yK-Tr5Dzcw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noreferrer">Bitbee LINE社群</a>。</>
                      : item
                  ) : <>{item.text}<ul>{item.subitems.map((sub) => <li key={sub}>{sub}</li>)}</ul></>}</li>
                ))}</ol>}
                {section.after?.map((p) => <p className="after" key={p}>{p}</p>)}
              </section>
            ))}

            <div className="closing">
              <span className="honey-dot">✓</span>
              <h2>感謝您完整閱讀</h2>
              <p>若對活動規則或審核結果有任何疑問，請透過官方 LINE 社群與我們聯繫。</p>
              <a href="https://line.me/ti/g2/WWiLvj9M5sOC-UvDEZWulezT1IB-yK-Tr5Dzcw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noreferrer">前往 Bitbee LINE 社群 ↗</a>
            </div>
          </article>
        </div>
      </main>

      <footer><div><span className="brand-mark small">B</span><b>Bitbee</b></div><p>© 2026 三智科技股份有限公司</p><a href="#top">回到頂端 ↑</a></footer>
      <a className="floating-top" href="#top" aria-label="回到頂端">↑</a>
    </>
  );
}
