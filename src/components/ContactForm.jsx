import { useState } from "react";

export default function ContactForm() {
    // 問い合わせ種別の状態を管理 (business または recruit)
    const [type, setType] = useState("business");

    return (
        <form
            className='space-y-6'
            onSubmit={(e) => {
                e.preventDefault();
                alert("デモ送信完了");
            }}
        >
            {/* 問い合わせ種別プルダウン */}
            <div>
                <label className='block text-lg font-bold text-gray-700 mb-2'>
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
                <label className='block text-lg font-bold text-gray-700 mb-2'>
                    お名前 <span className='text-red-500'>*</span>
                </label>
                <input
                    type='text'
                    required
                    className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                    placeholder='例：優伸 太郎'
                />
            </div>

            {/* ★条件付きレンダリング: typeが business の時だけ表示 */}
            {type === "business" && (
                <div className='animate-fade-in'>
                    <label className='block text-lg font-bold text-gray-700 mb-2'>貴社名</label>
                    <input
                        type='text'
                        className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                        placeholder='例：株式会社〇〇工務店'
                    />
                </div>
            )}

            <div>
                <label className='block text-lg font-bold text-gray-700 mb-2'>
                    メールアドレス <span className='text-red-500'>*</span>
                </label>
                <input
                    type='email'
                    required
                    className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                    placeholder='例：info@yuden.co.jp'
                />
            </div>

            <div>
                <label className='block text-lg font-bold text-gray-700 mb-2'>
                    お問い合わせ内容 <span className='text-red-500'>*</span>
                </label>
                <textarea
                    required
                    rows='5'
                    className='w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-primary'
                    placeholder='ご用件をご記入ください'
                ></textarea>
            </div>

            <div className='pt-4'>
                <button
                    type='submit'
                    className='w-full bg-primary text-white font-bold py-4 rounded shadow-lg hover:bg-primary-900 transition flex items-center justify-center gap-2'
                >
                    <span className='material-icons-round'>send</span>
                    送信する
                </button>
            </div>
        </form>
    );
}
