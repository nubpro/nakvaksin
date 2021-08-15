import { IoLogoGithub } from 'react-icons/io5';

export default function Footer() {
    return (
        <footer className="mt-8 text-center py-6 border-t border-gray-200 text-xs text-gray-700 w-full">
            An initiative by Malaysians for everyone
            <div className="mt-1">
                <a href="https://github.com/nubpro/nakvaksin">
                    <IoLogoGithub size={20} className="inline-block" />
                </a>
            </div>
        </footer>
    );
}
