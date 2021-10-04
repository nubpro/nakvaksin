import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

Header.propTypes = {
    isHomepage: PropTypes.bool
};

export default function Header({ isHomepage = false }) {
    return (
        <div
            className={classNames(
                'flex px-4 justify-between h-14',
                { 'bg-white bg-opacity-70': isHomepage },
                {
                    'border-b': !isHomepage
                }
            )}>
            <Link href="/">
                <a className="flex items-center text-xl text-blue-500 font-bold">NakVaksin</a>
            </Link>
        </div>
    );
}
