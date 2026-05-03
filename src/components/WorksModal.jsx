import { useState, useEffect } from "react";

// ★ propsとして works（MicroCMSのデータ）を受け取る
export default function WorksModal({ works = [] }) {
    const [isOpen, setIsOpen] = useState(false);

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
            <div className='text-center mt-12'>
                <button
                    onClick={() => setIsOpen(true)}
                    className='inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-50 hover:text-primary transition font-bold cursor-pointer'
                >
                    <span className='material-icons-round text-sm'>list</span>
                    実績一覧を見る
                </button>
            </div>

            {isOpen && (
                <div className='fixed inset-0 z-[100]' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                    <div
                        className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className='absolute inset-x-0 bottom-0 top-10 md:inset-10 md:max-w-screen-xl md:mx-auto bg-gray-50 rounded-t-xl md:rounded-xl shadow-2xl flex flex-col transform transition-all'>
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

                        <div className='flex-1 overflow-y-auto p-6 md:p-10'>
                            <div className='grid md:grid-cols-3 gap-6'>
                                {/* ★ MicroCMSのデータをループ（map）して表示 */}
                                {works.map((work) => (
                                    <div
                                        key={work.id}
                                        className='bg-white p-8 rounded shadow-lg border border-gray-100 border-t-4 border-t-primary'
                                    >
                                        <div className='w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm mb-6 mx-auto'>
                                            {/* アイコンが空の場合はデフォルトで 'work' を表示 */}
                                            <span className='material-icons-round text-3xl'>{work.icon || "work"}</span>
                                        </div>
                                        <h3 className='font-bold text-2xl mb-2 text-center'>{work.title}</h3>
                                        <p className='text-base text-gray-500 mb-4 text-center'>{work.location}</p>
                                        <hr className='border-gray-100 my-4' />
                                        <ul className='text-lg text-gray-600 list-disc list-inside space-y-1'>
                                            {/* details（工事内容）を改行ごとに分割して <li> で表示 */}
                                            {work.details &&
                                                work.details.split("\n").map((item, index) => {
                                                    if (!item.trim()) return null; // 空行は無視
                                                    return <li key={index}>{item}</li>;
                                                })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
