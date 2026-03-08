import { useState, useEffect } from "react";

export default function WorksModal() {
    const [isOpen, setIsOpen] = useState(false);

    // モーダルが開いている時は背景をスクロールさせない処理
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [isOpen]);

    return (
        <>
            {/* モーダルを開くボタン */}
            <div className='text-center mt-12'>
                <button
                    onClick={() => setIsOpen(true)}
                    className='inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-50 hover:text-primary transition font-bold cursor-pointer'
                >
                    <span className='material-icons-round text-sm'>list</span>
                    実績一覧を見る
                </button>
            </div>

            {/* モーダル本体 (isOpenがtrueの時だけ表示) */}
            {isOpen && (
                <div className='fixed inset-0 z-[100]' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                    {/* 背景の黒い部分 (クリックで閉じる) */}
                    <div
                        className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* 白いパネル部分 */}
                    <div className='absolute inset-x-0 bottom-0 top-10 md:inset-10 md:max-w-screen-xl md:mx-auto bg-gray-50 rounded-t-xl md:rounded-xl shadow-2xl flex flex-col transform transition-all'>
                        {/* ヘッダー */}
                        <div className='flex justify-between items-center p-6 bg-white border-b border-gray-200 rounded-t-xl'>
                            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                                <span className='material-icons-round text-primary'>list</span>
                                施工実績一覧
                            </h3>
                            <button
                                type='button'
                                onClick={() => setIsOpen(false)}
                                className='text-gray-400 hover:text-gray-600 transition p-2 rounded-full hover:bg-gray-100'
                            >
                                <span className='material-icons-round text-2xl'>close</span>
                            </button>
                        </div>

                        {/* スクロールする中身 */}
                        <div className='flex-1 overflow-y-auto p-6 md:p-10'>
                            <div className='grid md:grid-cols-3 gap-6'>
                                {/* 実績カード1 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>apartment</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>オフィスビル新築工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>都内某所</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>受変電設備設置</li>
                                        <li>幹線動力工事</li>
                                    </ul>
                                </div>

                                {/* 実績カード2 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>storefront</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>商業施設改修工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>神奈川県</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>電灯コンセント工事</li>
                                        <li>LED化工事</li>
                                    </ul>
                                </div>

                                {/* 実績カード3 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>school</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>公共施設電気設備工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>埼玉県</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>公共案件対応</li>
                                        <li>各種配線工事</li>
                                    </ul>
                                </div>

                                {/* 実績カード4 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>apartment</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>マンション大規模修繕</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>東京都内</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>共用部照明更新</li>
                                        <li>インターホン更新</li>
                                    </ul>
                                </div>

                                {/* 実績カード5 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>factory</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>工場電源増設工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>北関東エリア</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>動力盤設置</li>
                                        <li>生産ライン電源敷設</li>
                                    </ul>
                                </div>

                                {/* 実績カード6 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>store</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>店舗テナント工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>都内商業ビル</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>内装電気工事一式</li>
                                        <li>防災設備工事</li>
                                    </ul>
                                </div>

                                {/* 実績カード7 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>home_work</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>集合住宅 電気設備改修</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>千葉県</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>分電盤交換</li>
                                        <li>引込線改修工事</li>
                                    </ul>
                                </div>

                                {/* 実績カード8 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>local_hospital</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>医療施設 電源工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>都内某所</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>医療機器用電源増設</li>
                                        <li>無停電電源装置設置</li>
                                    </ul>
                                </div>

                                {/* 実績カード9 */}
                                <div className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'>
                                    <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                        <span className='material-icons-round text-3xl'>solar_power</span>
                                    </div>
                                    <h3 className='font-bold text-lg mb-2 text-center'>太陽光発電設備工事</h3>
                                    <p className='text-sm text-gray-500 mb-4 text-center'>関東全域</p>
                                    <hr className='border-gray-100 my-4' />
                                    <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                                        <li>パネル設置に伴う配線</li>
                                        <li>パワーコンディショナ設置</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mt-12 text-center'>
                                <p className='text-gray-500 text-sm'>
                                    他、多数の実績がございます。詳細はお問い合わせください。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
