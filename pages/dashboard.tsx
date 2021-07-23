import React from 'react';

import Header from '../components/header';
import SubscribeStatus from '../components/SubscribeStatus';
import VaxStatus from '../components/VaxStatus';

export default function dashboard() {
    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />
            <div className="space-y-3">
                <VaxStatus />
                <SubscribeStatus />
            </div>
        </div>
    );
}
