import { useState, useEffect } from "react";

/**
 * @typedef {Object} Work
 * @property {string} id
 * @property {string} title
 * @property {string} location
 * @property {string} details
 * @property {{url: string}} [icon]
 */

/**
 * @param {{ works: Work[] }} props  // ★ここが重要！worksはWork型の配列だと教える
 */

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
                    className='inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-50 hover:text-white transition font-bold cursor-pointer'
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
                            <div className='grid md:grid-cols-3 gap-8'>
                                {" "}
                                {/* gapを広く */}
                                {/* ★ MicroCMSのデータをループ（map）して表示 */}
                                {works.map((work) => (
                                    // ★ デザイン変更: rounded-2xl, flex-col, overflow-hidden
                                    <div
                                        key={work.id}
                                        className='bg-white rounded-2xl shadow-xl border border-gray-100 border-t-4 border-t-light overflow-hidden flex flex-col'
                                    >
                                        {/* ★ 画像エリア: React用 */}
                                        <div className='p-3 pb-0'>
                                            {work.icon && work.icon.url ? (
                                                <img
                                                    src={work.icon.url}
                                                    alt={work.title}
                                                    className='w-full aspect-[4/3] object-cover rounded-xl shadow-sm'
                                                />
                                            ) : (
                                                <div className='w-full aspect-[4/3] bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 shadow-inner'>
                                                    <span className='material-icons-round text-5xl'>image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* ★ テキストエリア */}
                                        <div className='p-6 md:p-8 text-center flex-grow'>
                                            <h3 className='font-bold text-2xl mb-2 text-gray-800'>{work.title}</h3>
                                            <p className='text-base text-gray-500 mb-4'>{work.location}</p>
                                            <hr className='border-gray-100 my-4' />
                                            <ul className='text-lg text-gray-600 list-disc list-inside space-y-1'>
                                                {work.details
                                                    ?.split("\n")
                                                    .map((item, i) => item.trim() && <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
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
