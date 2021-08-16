import classNames from 'classnames';
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
        <div
            className={classNames(
                'flex flex-col bg-gray-100 rounded-xl mb-2',
                { 'mb-2': !isOpened },
                {
                    'mb-4': isOpened
                }
            )}>
            <button onClick={() => setIsOpened((s) => !s)}>
                <div className="flex items-center">
                    <div className="flex-1 flex text-black p-4 font-bold text-left">{question}</div>
                    <div className="w-16">
                        {isOpened ? (
                            <FaChevronUp className="inline text-primary" />
                        ) : (
                            <FaChevronDown className="inline text-primary" />
                        )}
                    </div>
                </div>
            </button>

            {isOpened && (
                <div className="bg-gray-50 rounded-b-xl p-6">
                    <p className="break-words text-gray-800">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default function Faq() {
    return (
        <div className="container mx-auto" id="faq">
            <div className="mx-2">
                <div className="text-black text-lg text-center">
                    <a href="#faq">Soalan Yang Biasa Ditanya (FAQ)</a>
                </div>

                <div className="mt-3">
                    <FaqElement
                        question="Who are we?"
                        answer="We are three gentlemen from Malaysia trying to contribute to Malaysia’s current landscape. We hope this app serves its purpose which is to ensure everybody’s getting their vaccination dose!"
                    />
                    <FaqElement
                        question="Why did you build this?"
                        answer="In the early phase of vaccination, we noticed there’s a large group of people aren’t getting their notification when it’s their turn to be jabbed. Worst case is, they would miss out their appointment by accident. We also noticed that when appointment changes, MySejahtera doesn’t notify the users of the change. This app looks to address these shortcomings of MySejahtera."
                    />
                    <FaqElement
                        question="Do I need pay to use this app?"
                        answer="None, Nadda, Free, Percuma. However, maintaining this app still requires fundings. Hence donation and sponsor are welcome! Please contact us at nakvaksin@gmail.com"
                    />
                    <FaqElement
                        question="Will I get instantly updated as soon as my vaccination status changes?"
                        answer="Short answer is no and this is due to technical limitations. However, we will check your vaccination status as often as we can. This is currently limited to every hour. We will immediately inform you by SMS or email (your choice) as soon as we detected the changes on our side."
                    />
                    <FaqElement
                        question="Are you affiliated with the government or anybody?"
                        answer="We have no affiliation with any government bodies including but not limited to, JKJAV. This is a self-initiated non-commercial project. We have no ties with any parties, organizations or companies."
                    />
                    <FaqElement
                        question="What personal information is stored in your database?"
                        answer="Your name, phone number, email address and your MySejahtera’s ID. We DO NOT store sensitive information which reveals your location and I/C number."
                    />
                    <FaqElement
                        question="What other information is stored in your database?"
                        answer="For our app to authenticate with MySejahtera, we need to keep a history of your MySejahtera’s token. These tokens are then used to refer to MySejahtera to retrieve your vaccination status. All past tokens are to be removed in 90 days."
                    />
                    <FaqElement
                        question="Okay, but what is a token?"
                        answer="Please read previous FAQ before proceeding. In layman terms, token is a like a key and where MySejahtera is the lock. “We” need your key to access your vaccination status from MySejahtera. Tokens are temporarily and does not risk exposing your password to us."
                    />
                    <FaqElement
                        question="Is my MySejahtera’s password stored in your database?"
                        answer="We do not save your password. We are merely relaying your credentials you entered from our app to MySejahtera’s servers to obtain your information (non-sensitive) and vaccination status."
                    />
                    <FaqElement
                        question="I’m still in doubt. How can I trust this app?"
                        answer="We understand your concern and hence, we are all in on open sourcing our application’s frontend and backend. You can thoroughly review our code and check out the ins and out. Let us know if you find something suspicious…"
                    />
                    <FaqElement
                        question="How do I permanently delete my account from this app?"
                        answer="Please reach out to us directly via email (nakvaksin@gmail.com)."
                    />
                </div>
            </div>
        </div>
    );
}
