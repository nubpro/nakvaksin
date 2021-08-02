import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FaqElement = ({
    question,
    answer,
    isOpen = false
}: {
    question: string;
    answer: string;
    isOpen?: boolean;
}) => {
    const [isOpened, setIsOpened] = useState(isOpen);

    return (
        <div className="flex flex-col bg-gray-100 rounded-3xl">
            <button onClick={() => setIsOpened((s) => !s)}>
                <div className="py-4">
                    <div className="flex">
                        <h1 className="text-black uppercase pl-4 font-bold inline text-left">
                            {question}
                        </h1>
                        <div className="h-auto px-2 flex-grow text-right">
                            {isOpened ? (
                                <FaChevronUp className="inline text-black" />
                            ) : (
                                <FaChevronDown className="inline text-black" />
                            )}
                        </div>
                    </div>
                </div>
            </button>
            {isOpened && (
                <div className="bg-white h-auto rounded-b-xl p-8">
                    <p className="font-bold break-words">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default function Faq() {
    return (
        <div className="container h-auto mx-auto" id="faq-section">
            <div className="mx-2">
                <h1 className="text-black text-3xl text-center py-2">
                    <a href="#faq-section">Biasa Orang Selalu Tanya (FAQ)</a>
                </h1>
                <div className="bg-gray-300 rounded-2xl py-6 px-2">
                    <div className="space-y-5">
                        <FaqElement
                            question="Who are We?"
                            answer="We a group of Malaysian that try to help Malaysian hero to get their vaccination even faster!"
                        />
                        <FaqElement
                            question="Why make this application?"
                            answer="Some of the people miss their vaccination appointment due to sudden appointment or sudden changes in vaccination appointment. Therefore, we decided to build this application to help Malaysian hero to track their vaccination system."
                        />
                        <FaqElement
                            question="How does this app work?"
                            answer="Our System will check your vaccination behalf of you and notify you if your vaccination appointment is been made."
                        />
                        <FaqElement
                            question="How many i shall pay?"
                            answer="None, Nadda, Free, Percuma. However, there is still cost for the application, hence donation and sponsor are welcome"
                        />
                        <FaqElement
                            question="Will my password be save?"
                            answer="We will not store your password. "
                        />
                        <FaqElement
                            question="Why your notify me late?"
                            answer="We only check for your vaccination once per day, so checking your MySej is still faster"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
