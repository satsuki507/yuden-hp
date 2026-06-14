import { useState } from "react";

export default function ContactForm() {
    // 状態管理
    const [type, setType] = useState("business");
    const [isAgreed, setIsAgreed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle(待機), submitting(送信中), success(成功), error(失敗)

    // フォームの入力値を管理
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        message: "",
    });

    // 入力変更時の処理
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 送信ボタンが押された時の処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting"); // 送信中状態にする

        // 送信するデータ（Web3Formsの仕様に合わせる）
        const submitData = {
            access_key: "91d1a373-0f43-47c9-802a-b36b6e1f1d10", // 例: "12345678-abcd-..."
            subject: `（${type === "business" ? "企業向け" : "求人向け"}）【優伸電設】WEBサイトからのお問い合わせ: ${formData.name}様`, // 例: "【優伸電設】WEBサイトからのお問い合わせ: 山田太郎様"
            お問い合わせ種別: type === "business" ? "企業向け" : "求人向け",
            お名前: formData.name,
            貴社名: type === "business" ? formData.company : "（求人向けのため無し）",
            メールアドレス: formData.email,
            お問い合わせ内容: formData.message,
        };

        try {
            // Web3FormsのAPIへ送信
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                setStatus("success"); // 送信成功
            } else {
                setStatus("error"); // 送信失敗
            }
        } catch (error) {
            setStatus("error"); // 通信エラー
        }
    };

    // ▼ 送信成功時の画面切り替え
    if (status === "success") {
        return (
            <div className='text-center py-16 bg-white rounded-xl shadow-md border border-gray-100 animate-fade-in'>
                <span className='material-icons-round text-6xl text-primary mb-4 block'>check_circle</span>
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>送信完了しました</h3>
                <p className='text-gray-600 leading-relaxed'>
                    お問い合わせありがとうございます。
                    <br />
                    内容を確認の上、担当者よりご連絡いたします。
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className='mt-8 text-primary hover:underline font-bold'
                >
                    トップページへ戻る
                </button>
            </div>
        );
    }

    // ▼ 入力フォーム画面
    return (
        <form className='space-y-6 animate-fade-in' onSubmit={handleSubmit}>
            {/* エラーメッセージ */}
            {status === "error" && (
                <div className='bg-red-50 text-red-600 p-4 rounded-lg text-sm font-bold border border-red-200'>
                    送信に失敗しました。時間をおいて再度お試しください。
                </div>
            )}

            <div>
                <label className='block text-sm font-bold text-gray-700 mb-2'>
                    お問い合わせ種別 <span className='text-red-500'>*</span>
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className='w-full px-4 py-3 rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white'
                >
                    <option value='business'>企業向け（お仕事のご依頼・ご相談）</option>
                    <option value='recruit'>求人向け（採用・面接について）</option>
                </select>
            </div>

            <div>
                <label className='block text-sm font-bold text-gray-700 mb-2'>
                    お名前 <span className='text-red-500'>*</span>
                </label>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                    placeholder='例：優伸 太郎'
                />
            </div>

            {type === "business" && (
                <div className='animate-fade-in'>
                    <label className='block text-sm font-bold text-gray-700 mb-2'>貴社名</label>
                    <input
                        type='text'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                        placeholder='例：株式会社〇〇電設'
                    />
                </div>
            )}

            <div>
                <label className='block text-sm font-bold text-gray-700 mb-2'>
                    メールアドレス <span className='text-red-500'>*</span>
                </label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                    placeholder='例：info@yushin.co.jp'
                />
            </div>

            <div>
                <label className='block text-sm font-bold text-gray-700 mb-2'>
                    お問い合わせ内容 <span className='text-red-500'>*</span>
                </label>
                <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows='5'
                    className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                    placeholder='ご用件をご記入ください'
                ></textarea>
            </div>

            {/* プライバシーポリシー表示エリア */}
            <div className='pt-4'>
                <label className='block text-sm font-bold text-gray-700 mb-2'>
                    プライバシーポリシー <span className='text-red-500'>*</span>
                </label>
                <div className='h-48 overflow-y-auto p-5 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 leading-relaxed shadow-inner'>
                    <p className='mb-6'>
                        優伸電設株式会社（以下、「当社」）では、個人情報に関する法令およびその他の規範を遵守し、お客様の大切な個人情報の保護に万全を尽くします。
                    </p>

                    <h4 className='font-bold text-gray-900 mt-6 mb-3 border-l-4 border-primary pl-2'>
                        個人情報の収集について
                    </h4>
                    <p className='mb-2'>当社では、次のような場合に必要な範囲で個人情報を収集することがあります。</p>
                    <ul className='list-disc pl-5 mb-6 space-y-1'>
                        <li>当社へのお問い合わせ時</li>
                        <li>当社へのサービスお申し込み時</li>
                    </ul>

                    <h4 className='font-bold text-gray-900 mt-6 mb-3 border-l-4 border-primary pl-2'>
                        個人情報の利用目的について
                    </h4>
                    <p className='mb-2'>当社は、お客様から収集した個人情報を次の目的で利用いたします。</p>
                    <ul className='list-disc pl-5 mb-6 space-y-1'>
                        <li>お客様への連絡のため</li>
                        <li>お客様からのお問い合せに対する回答のため</li>
                        <li>お客様へのサービス提供のため</li>
                    </ul>

                    <h4 className='font-bold text-gray-900 mt-6 mb-3 border-l-4 border-primary pl-2'>
                        個人情報の第三者への提供について
                    </h4>
                    <p className='mb-2'>
                        当社では、お客様より取得した個人情報を第三者に開示または提供することはありません。ただし、次の場合は除きます。
                    </p>
                    <ul className='list-disc pl-5 mb-6 space-y-1'>
                        <li>ご本人の同意がある場合</li>
                        <li>警察からの要請など、官公署からの要請の場合</li>
                        <li>法律の適用を受ける場合</li>
                    </ul>

                    <h4 className='font-bold text-gray-900 mt-6 mb-3 border-l-4 border-primary pl-2'>
                        個人情報の開示、訂正等について
                    </h4>
                    <p className='mb-6'>
                        当社は、お客様ご本人からの自己情報の開示、訂正、削除等のお求めがあった場合は、確実に応じます。
                    </p>

                    <h4 className='font-bold text-gray-900 mt-6 mb-3 border-l-4 border-primary pl-2'>
                        個人情報保護に関するお問い合わせ先
                    </h4>
                    <p>
                        優伸電設株式会社
                        <br />
                        〒181-0003 東京都三鷹市北野1-1-9-101
                        <br />
                        TEL: 0422-26-5124
                    </p>
                </div>
            </div>

            {/* 同意チェックボックス */}
            <div className='flex items-center gap-2 mt-4 mb-6'>
                <input
                    type='checkbox'
                    id='privacy-policy'
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className='w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer'
                />
                <label htmlFor='privacy-policy' className='text-sm text-gray-700 cursor-pointer font-bold'>
                    プライバシーポリシーに同意する
                </label>
            </div>

            {/* 送信ボタン */}
            <div className='pt-2'>
                <button
                    type='submit'
                    disabled={!isAgreed || status === "submitting"}
                    className={`w-full font-bold py-4 rounded shadow-lg transition flex items-center justify-center gap-2 ${
                        isAgreed && status !== "submitting"
                            ? "bg-primary text-white hover:bg-primary-900 cursor-pointer"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                >
                    {status === "submitting" ? (
                        <>
                            {/* 送信中のぐるぐるアイコン */}
                            <span className='material-icons-round animate-spin'>autorenew</span>
                            送信中...
                        </>
                    ) : (
                        <>
                            <span className='material-icons-round'>send</span>
                            送信する
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
